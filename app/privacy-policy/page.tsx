export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-balance">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to LeaseEase. We respect your privacy and are committed to
              protecting your personal data. This privacy policy explains how we
              collect, use, and safeguard your information when you use our
              rental platform to list or book properties including houses,
              apartments, rooms, and other accommodations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information We Collect</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Name, email address, phone number, and date of birth</li>
                <li>Government-issued ID for identity verification</li>
                <li>Payment information and billing address</li>
                <li>Profile photos and property images</li>
                <li>Reviews, ratings, and communications with other users</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Property Information</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Property addresses, descriptions, and amenities</li>
                <li>Pricing, availability, and booking details</li>
                <li>Property photos and virtual tour content</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Usage Data</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Device information, IP address, and browser type</li>
                <li>App usage patterns and feature interactions</li>
                <li>Location data (with your permission)</li>
                <li>Search history and preferences</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Facilitate property listings, bookings, and payments</li>
              <li>Verify user identity and prevent fraud</li>
              <li>Provide customer support and resolve disputes</li>
              <li>Send booking confirmations and important updates</li>
              <li>Improve our services and develop new features</li>
              <li>Comply with legal obligations and safety requirements</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Other Users:</strong> Profile information, reviews, and
                property details as necessary for bookings
              </li>
              <li>
                <strong>Service Providers:</strong> Payment processors, identity
                verification services, and customer support tools
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to
                protect safety and security
              </li>
              <li>
                <strong>Business Partners:</strong> With your consent for
                promotional offers or integrated services
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including
              encryption, secure servers, and regular security audits to protect
              your personal information. However, no method of transmission over
              the internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access, update, or delete your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request data portability</li>
              <li>Withdraw consent for data processing</li>
              <li>File a complaint with data protection authorities</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce our agreements. Account information is
              typically retained for 3 years after account closure, while
              transaction records may be kept longer for legal and tax purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">International Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              to protect your data in accordance with applicable privacy laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. We will
              notify you of any material changes by email or through our app.
              Your continued use of LeaseEase after such changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or our data
              practices, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">LeaseEase Privacy Team</p>
              <p className="text-muted-foreground">
                Email: privacy@leaseease.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
