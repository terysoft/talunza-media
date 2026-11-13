#!/usr/bin/env python3
"""Offline CashTalk asset/metadata gate. No generation, upload or paid CI.

Important: a valid AAC stream does not prove intelligible narration.
Human/AI-reviewed voice, brand and sequence flags are required for FINAL.
"""
import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path

LOCKED = {
    "opener": ("76fb64a43bbe435ed5ba055fc6da26a4e2e7b9faa4e02e635b97c00c0cca7e11", 4.003),
    "closer": ("89fd9c3f02baa724c91455cff763651d2eedf68e88f429662214961eb32daf38", 5.000),
}

def sha256(path):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def probe(path):
    raw = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration,size:stream=codec_name,codec_type,width,height",
        "-of", "json", str(path)
    ], capture_output=True, text=True, check=True).stdout
    j = json.loads(raw)
    streams = j.get("streams", [])
    videos = [s for s in streams if s.get("codec_type") == "video"]
    audio = [s for s in streams if s.get("codec_type") == "audio"]
    if not videos: raise ValueError("no video stream")
    return {
        "duration_seconds": round(float(j["format"]["duration"]), 3),
        "size_bytes": path.stat().st_size,
        "width": videos[0].get("width"),
        "height": videos[0].get("height"),
        "video_codec": videos[0].get("codec_name"),
        "audio_stream_present": bool(audio),
        "sha256": sha256(path),
    }

def main():
    p = argparse.ArgumentParser(description="CashTalk fail-closed media QA; no CapCut, no paid CI")
    for role in ("opener", "closer", "scene1", "scene2", "scene3"):
        p.add_argument("--" + role, required=True)
    p.add_argument("--final")
    p.add_argument("--release", action="store_true")
    p.add_argument("--voice2-reviewed", action="store_true")
    p.add_argument("--voice3-reviewed", action="store_true")
    p.add_argument("--sequence-reviewed", action="store_true")
    p.add_argument("--ending-reviewed", action="store_true")
    args = p.parse_args()
    report = {"status": "NOT_FINAL", "files": {}, "failures": [],
              "note": "Audio stream presence does NOT prove intelligible voice; device download is a separate user-confirmed gate."}
    for role in ("opener", "closer", "scene1", "scene2", "scene3"):
        path = Path(getattr(args, role))
        if not path.is_file():
            report["failures"].append(role + ": file unavailable")
            continue
        try:
            facts = probe(path)
            report["files"][role] = {"basename": path.name, **facts}
            if facts["height"] <= facts["width"]:
                report["failures"].append(role + ": not portrait")
            if facts["video_codec"] != "h264":
                report["failures"].append(role + ": check video codec")
            if role in LOCKED:
                expected_hash, expected_dur = LOCKED[role]
                if facts["sha256"] != expected_hash:
                    report["failures"].append(role + ": WRONG LOCKED MASTER HASH")
                if abs(facts["duration_seconds"] - expected_dur) > 0.25:
                    report["failures"].append(role + ": wrong master duration")
            elif not 8 <= facts["duration_seconds"] <= 11:
                report["failures"].append(role + ": unexpected scene duration")
        except Exception as exc:
            report["failures"].append(role + ": probe failed (" + str(exc)[:100] + ")")
    if args.release:
        for flag in ("voice2_reviewed", "voice3_reviewed", "sequence_reviewed", "ending_reviewed"):
            if not getattr(args, flag):
                report["failures"].append("QA approval missing: " + flag)
        if not args.final:
            report["failures"].append("final export path missing")
        else:
            f = Path(args.final)
            if not f.is_file():
                report["failures"].append("final MP4 not found")
            else:
                try:
                    facts = probe(f)
                    report["files"]["final"] = {"basename": f.name, **facts}
                    # 3x10s scenes + 4s official opener + 5s closer = approx 39s.
                    if not 37 <= facts["duration_seconds"] <= 41:
                        report["failures"].append("final duration incompatible with 39s locked sequence")
                    if not facts["audio_stream_present"]:
                        report["failures"].append("final has no audio stream")
                except Exception as exc:
                    report["failures"].append("final MP4 probe failed: " + str(exc)[:100])
    report["status"] = ("BLOCKED" if report["failures"] else
                        "FINAL_METADATA_AND_HUMAN_GATES_PASSED" if args.release else
                        "SOURCE_MEDIA_PREFLIGHT_PASSED_ONLY")
    print(json.dumps(report, indent=2))
    return 1 if report["failures"] else 0

if __name__ == "__main__":
    sys.exit(main())
