import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

interface ImageProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  src: string;
  width?: number;
  height?: number;
  rounded?: boolean;
}

const Image = ({
  src,
  width = 500,
  height = 500,
  rounded = false,
  ...props
}: ImageProps) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "akiibajin-gallery",
      apiKey: import.meta.env.CLOUDINARY_API_KEY,
      apiSecret: import.meta.env.CLOUDINARY_API_SECRET,
    },
  });
  const img = cld
    .image(src)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height));
  if (rounded) img.border();
  return (
    <div {...props}>
      <AdvancedImage cldImg={img} />
    </div>
  );
};

export default Image;
