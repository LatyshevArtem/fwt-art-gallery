import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const getFingerprint = async () => {
  const fingerprint = await FingerprintJS.load();
  const { visitorId } = await fingerprint.get();
  return visitorId;
};
