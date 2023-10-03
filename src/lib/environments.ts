const {
	DOWNLOAD_DIR: downloadDir,
	UPLOAD_BUCKET: uploadBucket,
	DRY_RUN: dryRun,
	HEADLESS_MODE: headlessMode
} = process.env;

export const getEnvironments = () => ({
	downloadDir: downloadDir ?? '/tmp',
	uploadBucket,
	dryRun: dryRun === 'true',
	headlessMode: headlessMode === 'true'
});
