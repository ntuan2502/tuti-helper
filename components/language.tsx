"use client";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Image,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { languageData } from "../lib/languageData";

import { SharedSelection } from "@nextui-org/react";

type LanguageType = {
  id: string;
  name: string;
  avatar: string;
};

export default function Language() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale?.toString() || "vi";

  const [selectedLanguageId, setSelectedLanguageId] = useState<string>(locale);

  const selectedLanguage = languageData.find(
    (lang) => lang.id === selectedLanguageId
  );

  const selectedValue = selectedLanguage
    ? selectedLanguage.name
    : languageData[0].name;
  const selectedAvatar = selectedLanguage
    ? selectedLanguage.avatar
    : languageData[0].avatar;

  useEffect(() => {
    if (selectedLanguageId !== locale) {
      router.push("/" + selectedLanguageId + pathname.slice(3));
    }
  }, [selectedLanguageId, router, pathname, locale]);

  const handleSelectionChange = (keys: SharedSelection) => {
    const newSelectedLanguageId =
      typeof keys === "string" ? keys : [...keys][0].toString();

    if (newSelectedLanguageId) {
      setSelectedLanguageId(newSelectedLanguageId);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          <Image
            src={selectedAvatar} // Use the avatar of the selected language
            alt="language"
            width={30}
          />
          <p className="mx-1">{selectedValue}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([selectedLanguageId])}
        onSelectionChange={handleSelectionChange}
      >
        {languageData.map((language: LanguageType) => (
          <DropdownItem key={language.id}>
            <div className="flex items-center">
              <Image src={language.avatar} alt="language" width={25} />
              <p className="mx-2">{language.name}</p>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
