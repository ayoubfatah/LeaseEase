export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-balance">Terms of Service</h1>
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
            <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using LeaseEase, you accept and agree to be bound
              by the terms and provision of this agreement. LeaseEase is a
              platform that connects property owners with potential renters for
              houses, apartments, rooms, and other accommodations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Definitions</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>"Platform"</strong> refers to the LeaseEase mobile
                application and website
              </li>
              <li>
                <strong>"Host"</strong> refers to users who list properties for
                rent
              </li>
              <li>
                <strong>"Guest"</strong> refers to users who book accommodations
              </li>
              <li>
                <strong>"Property"</strong> includes houses, apartments, rooms,
                and other rental accommodations
              </li>
              <li>
                <strong>"Booking"</strong> refers to a confirmed reservation
                between a Host and Guest
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 18 years old to use LeaseEase. By using our
              platform, you represent and warrant that you have the legal
              capacity to enter into binding agreements and comply with these
              terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Account Registration</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                You must provide accurate, current, and complete information
                during registration
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials
              </li>
              <li>
                You must notify us immediately of any unauthorized use of your
                account
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate these terms
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Host Responsibilities</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Property Listings</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Provide accurate descriptions, photos, and amenity information
                </li>
                <li>Ensure you have legal authority to rent the property</li>
                <li>Comply with local laws, regulations, and HOA rules</li>
                <li>Maintain properties in safe and habitable condition</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Guest Interactions</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Respond to booking requests and messages promptly</li>
                <li>Honor confirmed bookings and availability calendars</li>
                <li>Provide clear check-in/check-out instructions</li>
                <li>Treat all guests fairly and without discrimination</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Guest Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Provide accurate information about your stay and party size
              </li>
              <li>Treat properties with respect and follow house rules</li>
              <li>Report any damages or issues promptly</li>
              <li>Leave properties in the same condition as found</li>
              <li>Comply with local laws and community standards</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Booking and Payment Terms
            </h2>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Booking Process</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Bookings are confirmed when payment is successfully processed
                </li>
                <li>
                  Hosts have 24 hours to accept or decline booking requests
                </li>
                <li>
                  Instant Book properties are automatically confirmed upon
                  payment
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Payment and Fees</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Guests pay the total amount including taxes and service fees
                </li>
                <li>LeaseEase charges a service fee for each booking</li>
                <li>Hosts receive payment 24 hours after guest check-in</li>
                <li>
                  Security deposits may be required for certain properties
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cancellation Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cancellation policies vary by property and are set by individual
              Hosts. Guests should review the specific cancellation policy
              before booking. LeaseEase may offer full refunds in cases of
              extenuating circumstances as defined in our policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Prohibited Activities</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users are prohibited from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Using the platform for illegal activities</li>
              <li>
                Discriminating against users based on protected characteristics
              </li>
              <li>Creating fake accounts or providing false information</li>
              <li>Circumventing our payment system</li>
              <li>Harassing, threatening, or abusing other users</li>
              <li>Violating intellectual property rights</li>
              <li>Using automated systems to access the platform</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Platform Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain platform availability but cannot guarantee
              uninterrupted service. We reserve the right to modify, suspend, or
              discontinue any part of our service with or without notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              LeaseEase acts as an intermediary platform and is not responsible
              for the actions of Hosts or Guests. We do not own, control, or
              manage any properties listed on our platform. Our liability is
              limited to the maximum extent permitted by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed">
              We encourage users to resolve disputes directly. If needed,
              LeaseEase may provide mediation services. Any legal disputes will
              be resolved through binding arbitration in accordance with the
              rules of the American Arbitration Association.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The LeaseEase platform, including its design, features, and
              content, is protected by copyright, trademark, and other
              intellectual property laws. Users retain rights to their own
              content but grant LeaseEase a license to use it for platform
              operations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Users will
              be notified of material changes via email or platform
              notification. Continued use of LeaseEase after changes constitutes
              acceptance of the modified terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              Either party may terminate this agreement at any time. LeaseEase
              may suspend or terminate accounts for violations of these terms.
              Upon termination, your right to use the platform ceases
              immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these terms of service, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">LeaseEase Legal Team</p>
              <p className="text-muted-foreground">
                Email: legal@leaseease.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
