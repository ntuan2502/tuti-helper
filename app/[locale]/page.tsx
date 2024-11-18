"use client";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    console.log(refreshKey);
  };

  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.screen.width);
      setScreenHeight(window.screen.height);
    }
  }, []);

  return (
    <div>
      <div>
      {t('resolutions')}: {screenWidth} x {screenHeight}
      </div>
      <Image
        src={`https://picsum.photos/${screenWidth}/${screenHeight}?refresh=${refreshKey}`}
        loading="lazy"
        alt="picsum"
        onClick={handleRefresh}
      />
    </div>
  );
}
