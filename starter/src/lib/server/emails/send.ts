import { dev } from '$app/environment';
import { sendTestEmail } from '$lib/server/emails/mailhog';
import { sendResendEmail } from '$lib/server/emails/resend';

const sendEmail = async (options: { from: string; to: string; subject: string; html: string }) => {
	if (!dev) {
		return await sendResendEmail(options);
	}

	return await sendTestEmail(options);
};

export { sendEmail };
