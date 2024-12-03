"use client";
import { Image, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function RandomImage() {
  const t = useTranslations();
  const [width, setWidth] = useState("1366");
  const [height, setHeight] = useState("768");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value.toString());
  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHeight(e.target.value.toString());

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="mb-6 w-full max-w-lg md:flex">
        <Input
          type="number"
          label={t("width")}
          value={width}
          onChange={handleWidthChange}
          fullWidth
          className="mb-4 md:px-4"
        />
        <Input
          type="number"
          label={t("height")}
          value={height}
          onChange={handleHeightChange}
          fullWidth
        />
      </div>

      <Image
        src={`https://picsum.photos/${width}/${height}?refresh=${refreshKey}`}
        alt="Random Image"
        width={width}
        height={height}
        loading="lazy"
        onClick={handleRefresh}
        className="rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out"
      />
    </div>
  );
}
