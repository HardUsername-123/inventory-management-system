import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircleWarning } from "lucide-react";

function PrivacyPolicyModal() {
  return (
    <div>
      {/* Trigger Button */}
      <Dialog className="">
        <DialogTrigger asChild>
          <MessageCircleWarning className="text-slate-100 h-10 w-10 hover:text-gray-300 cursor-pointer" />
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent className="max-w-3xl h-[650px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
            <DialogDescription>
              Learn how we collect, use, and protect your information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold">1. Information We Collect</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Personal Information:</strong> Data you provide, like
                name, email, phone number, address, and payment details.
              </li>
              <li>
                <strong>Usage Data:</strong> Information on how you interact
                with our services, such as pages visited, time spent, and
                actions performed.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> To enhance
                your experience and track preferences, such as login sessions
                and custom settings.
              </li>
              <li>
                <strong>Third-Party Data:</strong> Information from partners,
                affiliates, or other sources to supplement our records.
              </li>
            </ul>

            <h3 className="text-lg font-semibold">
              2. How We Use Your Information
            </h3>
            <p>
              We use your data to provide and improve services, personalize
              experiences, ensure security, and comply with legal requirements.
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>To process transactions and manage accounts.</li>
              <li>
                To send notifications, updates, and marketing communications.
              </li>
              <li>
                To diagnose technical issues and improve service reliability.
              </li>
            </ul>

            <h3 className="text-lg font-semibold">3. Your Rights</h3>
            <p>
              You can access, update, or delete your information and exercise
              your rights under applicable data protection laws.
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the information we
                have about you.
              </li>
              <li>
                <strong>Correction:</strong> Update inaccurate or incomplete
                data.
              </li>
              <li>
                <strong>Deletion:</strong> Request the removal of your
                information, subject to legal obligations.
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing
                communications.
              </li>
            </ul>

            <h3 className="text-lg font-semibold">4. Data Security</h3>
            <p>
              We prioritize the security of your data and implement measures to
              protect it. However, no system is completely secure. Some
              precautions we take include:
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Encryption of sensitive data during transmission.</li>
              <li>Regular security audits and vulnerability testing.</li>
              <li>Restricting access to authorized personnel only.</li>
            </ul>

            <h3 className="text-lg font-semibold">
              5. Sharing Your Information
            </h3>
            <p>
              We may share your information with trusted third parties under the
              following circumstances:
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Service Providers:</strong> To help deliver our services
                (e.g., hosting, analytics, payment processing).
              </li>
              <li>
                <strong>Legal Requirements:</strong> To comply with legal
                obligations or protect our rights.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with mergers,
                acquisitions, or sale of assets.
              </li>
            </ul>

            <h3 className="text-lg font-semibold">6. Retention of Data</h3>
            <p>
              We retain your data only as long as necessary to fulfill the
              purposes outlined in this Privacy Policy or as required by law.
            </p>

            <h3 className="text-lg font-semibold">
              7. Cookies and Tracking Technologies
            </h3>
            <p>
              We use cookies to enhance your experience. These cookies help with
              functionality, analytics, and marketing.
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Necessary for basic
                functionalities, such as account login.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> To monitor and improve our
                performance.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> To deliver personalized
                advertising.
              </li>
            </ul>

            <h3 className="text-lg font-semibold">8. Children's Privacy</h3>
            <p>
              Our services are not intended for individuals under the age of 13.
              We do not knowingly collect data from children. If you believe a
              child has provided us with personal information, please contact
              us.
            </p>

            <h3 className="text-lg font-semibold">9. International Users</h3>
            <p>
              If you are accessing our services from outside [Insert Country],
              your data may be transferred to and processed in [Insert Country].
              By using our services, you consent to this transfer.
            </p>

            <h3 className="text-lg font-semibold">
              10. Updates to This Policy
            </h3>
            <p>
              We may update this Privacy Policy to reflect changes in our
              practices or legal requirements. We encourage you to review it
              periodically.
            </p>

            <h3 className="text-lg font-semibold">11. Contact Us</h3>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us:
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Email:</strong> anthonycrausus14.ncmc@gmail.com
              </li>
              <li>
                <strong>Phone:</strong> +63951 029 0543
              </li>
              <li>
                <strong>Address:</strong> Pinoyak Lala, Lanao Del Norte
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PrivacyPolicyModal;
