"use client";
import { ChangeEvent, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export default function CheckID() {
  const t = useTranslations();
  const [number, setNumber] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function getProvinceName(ID: string): string {
    const provinceID = ID.slice(0, 3);
    switch (provinceID) {
      case "001":
        return "Hà Nội";
      case "002":
        return "Hà Giang";
      case "004":
        return "Cao Bằng";
      case "006":
        return "Bắc Kạn";
      case "008":
        return "Tuyên Quang";
      case "010":
        return "Lào Cai";
      case "011":
        return "Điện Biên";
      case "012":
        return "Lai Châu";
      case "014":
        return "Sơn La";
      case "015":
        return "Yên Bái";
      case "017":
        return "Hòa Bình";
      case "019":
        return "Thái Nguyên";
      case "020":
        return "Lạng Sơn";
      case "022":
        return "Quảng Ninh";
      case "024":
        return "Bắc Giang";
      case "025":
        return "Phú Thọ";
      case "026":
        return "Vĩnh Phúc";
      case "027":
        return "Bắc Ninh";
      case "030":
        return "Hải Dương";
      case "031":
        return "Hải Phòng";
      case "033":
        return "Hưng Yên";
      case "034":
        return "Thái Bình";
      case "035":
        return "Hà Nam";
      case "036":
        return "Nam Định";
      case "037":
        return "Ninh Bình";
      case "038":
        return "Thanh Hóa";
      case "040":
        return "Nghệ An";
      case "042":
        return "Hà Tĩnh";
      case "044":
        return "Quảng Bình";
      case "045":
        return "Quảng Trị";
      case "046":
        return "Thừa Thiên Huế";
      case "048":
        return "Đà Nẵng";
      case "049":
        return "Quảng Nam";
      case "051":
        return "Quảng Ngãi";
      case "052":
        return "Bình Định";
      case "054":
        return "Phú Yên";
      case "056":
        return "Khánh Hòa";
      case "058":
        return "Ninh Thuận";
      case "060":
        return "Bình Thuận";
      case "062":
        return "Kon Tum";
      case "064":
        return "Gia Lai";
      case "066":
        return "Đắk Lắk";
      case "067":
        return "Đắk Nông";
      case "068":
        return "Lâm Đồng";
      case "070":
        return "Bình Phước";
      case "072":
        return "Tây Ninh";
      case "074":
        return "Bình Dương";
      case "075":
        return "Đồng Nai";
      case "077":
        return "Bà Rịa - Vũng Tàu";
      case "079":
        return "Hồ Chí Minh";
      case "080":
        return "Long An";
      case "082":
        return "Tiền Giang";
      case "083":
        return "Bến Tre";
      case "084":
        return "Trà Vinh";
      case "086":
        return "Vĩnh Long";
      case "087":
        return "Đồng Tháp";
      case "089":
        return "An Giang";
      case "091":
        return "Kiên Giang";
      case "092":
        return "Cần Thơ";
      case "093":
        return "Hậu Giang";
      case "094":
        return "Sóc Trăng";
      case "095":
        return "Bạc Liêu";
      case "096":
        return "Cà Mau";
      default:
        return t("not_found");
    }
  }
  function getGender(ID: string): string {
    const genderID = ID.slice(3, 4);
    if (
      genderID == "0" ||
      genderID == "2" ||
      genderID == "4" ||
      genderID == "6" ||
      genderID == "8"
    )
      return t("male");
    else return t("female");
  }
  function getYearOfBirth(ID: string): string {
    let millennium = "19";
    const genderID = ID.slice(3, 4);
    const yearOfBirth = ID.slice(4, 6);
    if (genderID == "0" || genderID == "1") millennium = "19";
    else if (genderID == "2" || genderID == "3") millennium = "20";
    else if (genderID == "4" || genderID == "5") millennium = "21";
    else if (genderID == "6" || genderID == "7") millennium = "22";
    else millennium = "23";
    return millennium + yearOfBirth;
  }

  const handleSubmit = (): void => {
    setIsInvalid(false);
    if (number.length < 12) {
      setIsInvalid(true);
      setErrorMessage(t("id_error"));
      return;
    } else {
      toast(
        <div>
          {t("province")}: {getProvinceName(number)}
          <br />
          {t("gender")}: {getGender(number)}
          <br />
          {t("year_of_birth")}: {getYearOfBirth(number)}
        </div>
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // Chỉ cho phép nhập các ký tự là số
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumber(value);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <Input
          label={t("enter_id_number")}
          value={number}
          onChange={handleChange}
          maxLength={12}
          placeholder={t("enter_number")}
          className="w-80"
          isInvalid={isInvalid}
          errorMessage={errorMessage}
        />
        <Button onClick={handleSubmit} className="w-80">
          Submit
        </Button>
      </div>
    </div>
  );
}
