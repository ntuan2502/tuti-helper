"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Textarea,
} from "@nextui-org/react";
import { CheckCircleIcon, ClipboardIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { SharedSelection } from "@nextui-org/react";
import { toast } from "react-toastify";

type ConvertType = {
  id: string;
  name: string;
};

const loremExample =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis libero pharetra, feugiat enim a, bibendum purus. Nullam diam metus, laoreet et nulla sit amet, ultrices lacinia ante. Sed malesuada a diam sit amet mollis. Ut finibus, sem eu ornare rhoncus, lectus ipsum aliquam dolor, a eleifend eros arcu ut magna. Fusce ac mauris turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut feugiat pretium semper. Vivamus odio nisl, finibus eget neque quis, lobortis dictum leo. Ut at scelerisque nisi. Mauris ut risus ac felis ornare tincidunt id et nulla. Suspendisse potenti. Maecenas quis eros vitae dui gravida rhoncus at non sapien. Quisque orci lacus, blandit vehicula mauris vel, tincidunt aliquet augue. Morbi varius vestibulum lorem interdum ornare. Morbi et nunc porta, sodales arcu sit amet, blandit urna.\n\nDuis ac ex vitae sapien gravida sodales. Aenean convallis pretium ligula, finibus mattis turpis venenatis non. Duis consectetur urna sed bibendum ornare. Aenean sed elit tortor. Phasellus vulputate nisl cursus lacus laoreet vestibulum. Sed fermentum lorem sed ligula viverra, id laoreet nulla condimentum. Praesent quis quam at nisl semper efficitur. Suspendisse et turpis posuere, luctus libero nec, scelerisque ligula. Nulla eu nunc enim. Suspendisse sit amet turpis tristique, pellentesque lacus a, sollicitudin massa.\n\nDonec nec neque est. Cras sollicitudin dolor mattis maximus rutrum. Nullam condimentum a arcu sed maximus. Quisque vel sodales lorem. Aliquam facilisis diam auctor, finibus elit id, efficitur dui. Quisque vitae tristique neque, eu hendrerit nibh. In nec bibendum libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent aliquet est eget sem maximus, et euismod tellus scelerisque. Duis suscipit varius ultrices. In sodales, leo ut porttitor rhoncus, augue tortor porttitor ipsum, quis rutrum ex libero non nunc.\n\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Sed luctus tortor sit amet risus pharetra ullamcorper. Mauris nec massa eget purus varius tempus. Morbi volutpat ligula ex, vestibulum aliquet ex faucibus eget. Nullam dolor justo, malesuada id lorem a, tincidunt sodales enim. Aenean tempor velit a mattis porttitor. Suspendisse sit amet hendrerit lacus, a consectetur tellus.\n\nPellentesque fermentum est quis erat lobortis, a pharetra nulla ullamcorper. Nullam eleifend pulvinar vehicula. Pellentesque tempus tempor tristique. Nulla vitae diam vitae risus molestie hendrerit non ut mauris. Integer suscipit est sed augue mollis tincidunt. Maecenas in ullamcorper est. Quisque luctus quam at justo pellentesque, eu hendrerit est accumsan. Nam eu orci ut augue luctus semper sed a massa. Duis id vulputate erat.";

export default function ConvertCase() {
  const t = useTranslations();
  const [source, setSource] = useState(loremExample);
  const [destination, setDestination] = useState("");
  const [selectedConvertId, setSelectedConvertId] = useState<string>("uppercase");
  const [copiedSource, setCopiedSource] = useState(false);
  const [copiedDestination, setCopiedDestination] = useState(false);

  const convertData = [
    {
      id: "uppercase",
      name: t("uppercase"),
    },
    {
      id: "lowercase",
      name: t("lowercase"),
    },
    {
      id: "capitalize",
      name: t("capitalize"),
    },
  ];

  const selectedCase = convertData.find(
    (convert) => convert.id === selectedConvertId
  );

  const selectedValue = selectedCase ? selectedCase.name : convertData[0].name;

  const convertText = (text: string, caseType: string) => {
    switch (caseType) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      case "capitalize":
        return capitalize(text);
      default:
        return text;
    }
  };

  useEffect(() => {
    const convertedText = convertText(source, selectedConvertId);
    setDestination(convertedText);
  }, [source, selectedConvertId]);

  const handleSelectionChange = (keys: SharedSelection) => {
    const newSelectedConvertId =
      typeof keys === "string" ? keys : [...keys][0].toString();

    if (newSelectedConvertId) {
      setSelectedConvertId(newSelectedConvertId);
    }
  };

  const copyToClipboard = (text: string, target: "source" | "destination") => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (target === "source") {
          setCopiedSource(true);
          setTimeout(() => setCopiedSource(false), 1500);
        } else {
          setCopiedDestination(true);
          setTimeout(() => setCopiedDestination(false), 1500);
        }
      })
      .catch((err) => {
        toast(t("error") + err);
      });
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {t("convert_case")}
        </h2>

        <div className="mb-6 relative">
          <Textarea
            label={t("original_text")}
            placeholder={t("enter_text")}
            className="w-full"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <Button
            onClick={() => copyToClipboard(source, "source")}
            className="absolute top-2 right-2 p-1"
            variant="light"
            size="sm"
          >
            {copiedSource ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
        </div>

        <div className="mb-6">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className={`${selectedConvertId} w-full`}
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={new Set([selectedConvertId])}
              onSelectionChange={handleSelectionChange}
            >
              {convertData.map((convert: ConvertType) => (
                <DropdownItem key={convert.id} className={convert.id}>
                  {convert.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="relative">
          <Textarea
            label={t("converted_text")}
            placeholder={t("converted_text_placeholder")}
            className="w-full"
            value={destination}
            readOnly
          />
          <Button
            onClick={() => copyToClipboard(destination, "destination")}
            className="absolute top-2 right-2 p-1"
            variant="light"
            size="sm"
          >
            {copiedDestination ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function capitalize(str: string): string {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
