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

// Import SharedSelection type from NextUI
import { SharedSelection } from "@nextui-org/react"; // Ensure SharedSelection is imported from NextUI

type LanguageType = {
  id: string;
  name: string;
  avatar: string;
};

export default function Language() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale?.toString() || "vi"; // Default to "vi" if locale is not available

  // Initialize state for selected language ID
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>(locale);

  // Find selected language data based on the selected language ID
  const selectedLanguage = languageData.find(
    (lang) => lang.id === selectedLanguageId
  );

  const selectedValue = selectedLanguage
    ? selectedLanguage.name
    : languageData[0].name;
  const selectedAvatar = selectedLanguage
    ? selectedLanguage.avatar
    : languageData[0].avatar;

  // Update the locale in the URL when selectedLanguageId changes
  useEffect(() => {
    // Only update the URL if the selected language changes
    if (selectedLanguageId !== locale) {
      router.push("/" + selectedLanguageId + pathname.slice(3)); // Navigate to the new URL with the selected language
    }
  }, [selectedLanguageId, router, pathname, locale]);

  // Handle selection change
  const handleSelectionChange = (keys: SharedSelection) => {
    // Convert the key(s) to string if it's not already a string
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
              <Image
                src={language.avatar}
                alt="language"
                width={25}
              />
              <p className="mx-2">{language.name}</p>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
