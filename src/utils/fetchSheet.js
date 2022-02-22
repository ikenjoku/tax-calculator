import * as XLSX from "xlsx";

const getBands = (header, values) => {
  const start = 3;
  const bandsArr = [];
  const ranges = Object.values(header).slice(start);
  const valuesForBands = Object.values(values).slice(start);
  console.log("ranges", ranges);
  console.log("valuesForBands", valuesForBands);
  ranges.forEach((str, i) => {
    if (str.includes("above")) {
      bandsArr.push({
        min: parseInt(str.split(" ")[1].trim()),
        max: Infinity,
        percent: valuesForBands[i],
      });
    } else {
      bandsArr.push({
        min: parseInt(str.split("-")[0].trim()),
        max: parseInt(str.split("-")[1].trim()),
        percent: valuesForBands[i],
      });
    }
  });
  return bandsArr;
};

const parseSheet = (spreedSheet) => {
  const data = [];
  for (const sheetName in spreedSheet) {
    const countryData = spreedSheet[sheetName];
    const healthInsurance = countryData[1];
    const socialSecurity = countryData[2];
    const emplyeeSocialSecurity = countryData[5];
    const payrollTax = countryData[3];
    const incomeTax = countryData[6];
    const employerHeader = countryData[0];
    const employeeHeader = countryData[4];
    const payrollBands = getBands(employerHeader, payrollTax);
    const incomneBands = getBands(employeeHeader, incomeTax);
    data.push({
      country: sheetName,
      employer: {
        "Health Insurance": {
          type: healthInsurance.__EMPTY_1,
          percent: healthInsurance.__EMPTY_2,
        },
        "Social Security": {
          type: socialSecurity.__EMPTY_1,
          percent: socialSecurity.__EMPTY_2,
        },
        "Payroll Tax": {
          type: payrollTax.__EMPTY_1,
          bands: payrollBands,
        },
      },
      employee: {
        "Social Security": {
          type: emplyeeSocialSecurity.__EMPTY_1,
          percent: emplyeeSocialSecurity.__EMPTY_2,
        },
        "Income Tax": {
          type: incomeTax.__EMPTY_1,
          bands: incomneBands,
        },
      },
    });
  }

  return data;
};

export async function fetchSheet() {
  try {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG2IDx8WhXSmKpCeAMeSEsjBo7Kk5q1SC4wg_HUjFbI5T9OT7Qv9zL1UYo-Todw0vF2O0V1RcCY9-F/pub?output=xlsx";
    const data = await (await fetch(url)).arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data, {
      type: "binary",
    });

    let worksheets = {};
    for (const sheetName of workbook.SheetNames) {
      worksheets[sheetName] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
    }
    return parseSheet(worksheets);
  } catch (error) {
    console.log("Error getting sheet data", error);
  }
}
