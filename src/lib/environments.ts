const {
	DOWNLOAD_DIR: downloadDir,
	UPLOAD_BUCKET: uploadBucket,
	DRY_RUN: dryRun
} = process.env;

export const getEnvironments = () => ({
	downloadDir: downloadDir ?? '/tmp',
	uploadBucket,
	dryRun: dryRun === 'true'
});
