"use client";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useMemo, useState, useEffect } from "react";
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
  const locale = params.locale?.toString();

  // Initialize state for selectedKeys
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set([locale || "vi"])
  );

  // Compute the selectedValue from selectedKeys
  const selectedValue = useMemo(() => {
    const selectedKey = Array.from(selectedKeys)[0]; // Get the selected key
    const selectedLanguage = languageData.find(
      (lang) => lang.id === selectedKey
    );
    return selectedLanguage ? selectedLanguage.name : languageData[0].name;
  }, [selectedKeys]);

  // Update the locale in the URL when selectedKeys change
  useEffect(() => {
    const selectedKey = Array.from(selectedKeys)[0];
    router.push("/" + selectedKey + pathname.slice(3)); // Navigate to the new URL with the selected language
  }, [selectedKeys, router, pathname]);

  // Handle selection change
  const handleSelectionChange = (keys: SharedSelection) => {
    if (keys instanceof Set) {
      // If keys is a Set, convert its elements to strings and store it as Set<string>
      const stringSet = new Set<string>([...keys].map(String));
      setSelectedKeys(stringSet);
    } else if (typeof keys === "string") {
      // If keys is a string, convert it to a Set<string>
      setSelectedKeys(new Set([keys]));
    }
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange} // Handle selection change
        >
          {languageData.map((language: LanguageType) => (
            <DropdownItem key={language.id}>{language.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
