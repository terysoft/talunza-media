'use strict';

// Synthetic ArtistOS domain contract ONLY. Not an authentication service, API, or legal check.
const transitions = Object.freeze({
  ENQUIRY: ['MORE_INFO_REQUIRED', 'OFFER_RECEIVED', 'DECLINED'],
  MORE_INFO_REQUIRED: ['OFFER_RECEIVED', 'DECLINED'],
  OFFER_RECEIVED: ['AWAITING_ARTIST_APPROVAL', 'DECLINED'],
  AWAITING_ARTIST_APPROVAL: ['CONFIRMED', 'DECLINED'],
  CONFIRMED: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [], CANCELLED: [], DECLINED: [],
});
const result = (decision, reason) => Object.freeze({ decision, reason });

// The caller must supply *trusted, already-evaluated* server authority evidence.
// This fixture must never replace a real verifier or accept a client bool as proof.
function evaluateBookingTransition(booking, toStatus, context) {
  if (!booking || typeof booking !== 'object' || !Object.hasOwn(transitions, booking.status)) {
    return result('DENY', 'INVALID_CURRENT_STATUS');
  }
  if (!Object.hasOwn(transitions, toStatus) || !transitions[booking.status].includes(toStatus)) {
    return result('DENY', 'INVALID_TRANSITION');
  }
  if (!context || !context.serverAuthorityChecked) {
    return result('DEFER', 'SERVER_AUTHORITY_REQUIRED');
  }
  if (!context.artistRef || !context.workspaceRef ||
      context.artistRef !== booking.artistRef || context.workspaceRef !== booking.workspaceRef) {
    return result('DENY', 'CROSS_ARTIST_OR_WORKSPACE');
  }
  if (!context.actorRef || context.canManageBooking !== true) {
    return result('DENY', 'MISSING_ARTIST_SCOPED_PERMISSION');
  }
  if (!Number.isSafeInteger(booking.revision) || context.expectedRevision !== booking.revision) {
    return result('DEFER', 'STALE_OR_UNKNOWN_REVISION');
  }
  if (toStatus === 'CONFIRMED') {
    if (context.artistApprovalRecorded !== true) {
      return result('REQUIRE_APPROVAL', 'ARTIST_APPROVAL_REQUIRED');
    }
    if (context.writtenTermsReviewed !== true) {
      return result('DEFER', 'WRITTEN_TERMS_REVIEW_REQUIRED');
    }
  }
  if (toStatus === 'COMPLETED' && context.performanceEvidenceRecorded !== true) {
    return result('DEFER', 'PERFORMANCE_EVIDENCE_REQUIRED');
  }
  if (toStatus === 'CANCELLED' && context.cancellationReviewed !== true) {
    return result('REQUIRE_APPROVAL', 'CANCELLATION_REVIEW_REQUIRED');
  }
  return result('ALLOW', 'PERMITTED_BY_FIXTURE');
}

module.exports = { transitions, evaluateBookingTransition };
