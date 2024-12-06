"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "./Icons";
import Language from "./language";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const t = useTranslations();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="center">
        <NavbarBrand>
          <Link href="/" color="foreground">
            <AcmeLogo />
            <p className="font-bold text-inherit"></p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" color="foreground">
            <AcmeLogo />
            <p className="font-bold text-inherit"></p>
          </Link>
        </NavbarBrand>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description={t("random_image_details")}
              startContent={icons.scale}
              onClick={() => router.push("/random-image")}
            >
              {t("random_image")}
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description={t("convert_case_details")}
              startContent={icons.activity}
              onClick={() => router.push("/convert-case")}
            >
              {t("convert_case")}
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description={t("check_id_details")}
              startContent={icons.flash}
              onClick={() => router.push("/check-id")}
            >
              {t("check_id")}
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
              startContent={icons.server}
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
              startContent={icons.user}
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* <NavbarItem isActive>
          <Link href="/random-image" aria-current="page">
            {t("random_image")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/convert-case">
            {t("convert_case")}
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        {isLogin ? (
          <>
            <NavbarItem className="hidden md:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button as={Link} color="warning" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform hidden md:flex"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        <Button
          color="primary"
          radius="full"
          className="hidden md:flex"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          X
        </Button>
        <NavbarItem>
          <Language />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="w-full"
            href="/random-image"
            size="lg"
            color="foreground"
          >
            {t("random_image")}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            href="/convert-case"
            size="lg"
            color="foreground"
          >
            {t("convert_case")}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            href="/check-id"
            size="lg"
            color="foreground"
          >
            {t("check_id")}
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
