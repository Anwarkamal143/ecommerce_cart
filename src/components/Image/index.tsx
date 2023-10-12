import "./image.scss";

import {
  ComponentPropsWithoutRef,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getUrlParts, isValidUrl } from "utils";

// import RoundPlaceholder from 'components/skeletons/PlaceholderSvg';
import { v4 } from "uuid";

export type ImageType = ComponentPropsWithoutRef<"img"> & {
  onImageLoad?: (...args: any[]) => void;
  onError?: (...args: any[]) => void;
  breakCache?: boolean;
  rounded?: boolean;
  wrapperClasses?: string;

  cencerodUrl?: JSX.Element | string | null;
  imgWrapperClass?: string;
};
const Image = (props: ImageType, ref: any) => {
  const {
    className = "",
    imgWrapperClass = "",
    onImageLoad,
    breakCache = false,
    onError: onImageError,
    loading: loadStrategy = "lazy",
    wrapperClasses,
    src = "",
    rounded = false,

    height,
    width,

    ...rest
  } = props;
  const imageId = useRef(`image_${v4()}`);

  const [imgSrc, setImgSrc] = useState("");

  const [imgWrapperClasses, setImgWrapperClasses] = useState({
    loadingState: props.src ? "initializing" : "loaded",
    defaultImage: "",
    error: "",
    classses: "",
  });

  const onStateChange = (state?: Partial<typeof imgWrapperClasses>) => {
    setImgWrapperClasses((s) => ({ ...s, ...state }));
  };

  const onAddSrc = (src = props.src) => {
    if (src) {
      const isValidU = isValidUrl(src);
      onStateChange({ loadingState: isValidU ? "loading" : "loaded" });
      setImgSrc(src);
    }
  };

  const onLoad = useCallback(
    (e: any) => {
      onStateChange({ loadingState: "loaded", error: "" });
      onImageLoad?.({ e, propSrc: imgSrc });
    },

    [imgWrapperClasses.loadingState, imgWrapperClasses.error]
  );

  const onError = useCallback(
    (e: any) => {
      onStateChange({
        loadingState: "loaded",
        error: "error",
        defaultImage: "defaultImage",
      });

      onImageError?.({ e, props });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imgWrapperClasses.error, imgWrapperClasses.loadingState]
  );

  useEffect(() => {
    const imageSrc: any = src || "";
    if (!!imageSrc.trim()) {
      onAddSrc(imageSrc);

      return;
    }
  }, [props.src]);

  useEffect(() => {
    if (breakCache) {
      if (isValidUrl(src as string)) {
        const { url } = getUrlParts(src as string);
        onAddSrc(`${url}?${new Date().getTime()}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakCache]);

  const getComponent = () => {
    if (!imgSrc) {
      return null;
    }

    return (
      <>
        <img
          {...rest}
          loading={loadStrategy}
          ref={ref}
          onLoad={onLoad}
          src={imgSrc}
          alt={props?.alt || "Image"}
          onError={onError}
          className={`${className} original_image`}
        />
      </>
    );
  };
  return (
    <div
      id={imageId.current}
      className={`image-comp ${
        rounded ? " rounded_img " : ""
      } ${wrapperClasses}  ${Object?.values(imgWrapperClasses || {})?.join(
        " "
      )}`}
    >
      <div
        className={`image-comp-inner ${imgWrapperClass}`}
        style={{
          width: width || "100%",
          height: height || "100%",
        }}
      >
        {getComponent()}
      </div>
    </div>
  );
};

export default forwardRef<MutableRefObject<HTMLImageElement>, ImageType>(Image);
