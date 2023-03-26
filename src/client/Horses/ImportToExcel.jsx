import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DownloadToExcel = ({ horses }) => {
    
  const prepareData = () => {
    const headers = [
      { label: "Név", key: "name" },
      { label: "Születési dátum", key: "birthdate" },
      { label: "Útlevélszám", key: "passportNumber" },
      { label: "Chipszám", key: "chipNumber" },
      { label: "Apja", key: "father" },
      { label: "Anyja", key: "mother" },
      { label: "Vakcina dátuma", key: "vaccinationDate" },
      { label: "Vérvétel dátuma", key: "bloodTestDate" },
      { label: "Foglalkoztatás", key: "workType" },
    ];

    return horses.map((horse) => ({
      name: horse.horse_name,
      birthdate: horse.horse_birthdate.split('T'),
      father: horse.horse_father,
      mother: horse.horse_mother,
      vaccinationDate: horse.vaccination_date.split('T'),
      bloodTestDate: horse.blood_test_date.split('T'),
      passportNumber: horse.passport_number,
      chipNumber: horse.chip_number,
      workType: horse.work_type,
    })).map((row) => headers.map(({ key }) => row[key]));

  };

  const downloadExcel = () => {
    const data = prepareData();
    const worksheet = XLSX.utils.aoa_to_sheet([[
      "Név",
      "Születési dátum",
      "Útlevélszám",
      "Chipszám",
      "Apja",
      "Anyja",
      "Vakcina dátuma",
      "Vérvétel dátuma",
      "Foglalkoztatás"
    ], ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lovak");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "lovak.xlsx");
  };

  return (
    <button onClick={downloadExcel}>Exportálás Excel fájlba</button>
  );
};

export default DownloadToExcel;
