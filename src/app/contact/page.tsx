'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
	return (
		<div className="min-h-screen">
			<section className="py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto rounded-2xl shadow-lg p-8">
					<h1 className="text-4xl font-bold text-center mb-2">Contact Us</h1>
					<p className="text-center text-muted-foreground mb-10">
						We'd love to hear from you. Reach out with questions, feedback, or just say hello!
					</p>

					<div className="grid md:grid-cols-2 gap-10 ">
						{/* Contact Info */}
						<div className="space-y-6 text-gray-400">
							<div className="flex items-start gap-4">
								<Mail className="w-6 h-6 text-primary" />
								<div>
									<h4 className="font-semibold">Email</h4>
									<p>info@upstairsacademy.edu</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<Phone className="w-6 h-6" />
								<div>
									<h4 className="font-semibold">Phone</h4>
									<p>0770 - 123 - 456</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<MapPin className="w-6 h-6 text-primary" />
								<div>
									<h4 className="font-semibold">Location</h4>
									<p>Upstairs Christian Academy, Monrovia, Liberia</p>
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<form className="space-y-6">
							<Input type="text" placeholder="Your Name" required />
							<Input type="email" placeholder="Your Email" required />

							<p className="text-sm text-muted-foreground">
								A staff member will get back to you as soon as possible.
							</p>

							<Button type="submit" className="w-full">
								Send
							</Button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}
