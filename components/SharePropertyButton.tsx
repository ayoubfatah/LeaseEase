import { PropertyType } from "@/types/types";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
  InstapaperIcon,
} from "react-share";
export default function SharePropertyButton({
  property,
}: {
  property: PropertyType;
}) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  const typeLabel =
    property && typeof (property as any).type === "string" && property.type
      ? (property.type as string)
      : "Property";
  const normalizedType = typeLabel.replace(/\s/g, "");
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this Property :
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          hashtag={`#${normalizedType}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property?.name || "Check out this property"}
          hashtags={[`${normalizedType}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property?.name || "Check out this property"}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property?.name || "Property listing"}
          body={`CHeck out this property listing `}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
}
