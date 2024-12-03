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

type ConvertType = {
  id: string;
  name: string;
};

export default function ConvertCase() {
  const convert = "uppercase";
  const t = useTranslations();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedConvertId, setSelectedConvertId] = useState<string>(convert);
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
      id: "sentencecase",
      name: t("sentencecase"),
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
      case "sentencecase":
        return toSentenceCase(text);
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
        alert("Lỗi khi sao chép: " + err);
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
            aria-label="Sao chép văn bản gốc"
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
              aria-label="Chọn kiểu chuyển đổi"
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
            aria-label="Sao chép văn bản đã chuyển đổi"
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

function toSentenceCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function capitalize(str: string): string {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
