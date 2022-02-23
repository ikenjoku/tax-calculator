import React from "react";
import { useTaxCalculator } from "./context/CalculatorProvider";
import {
  SelectField,
  Center,
  Output,
  Input,
  SpaceTop,
  SpaceBottom,
  InputField,
  Employee,
} from "./components/styles";

const ROUND = Math.round;

function App() {
  const {
    output,
    currentGross,
    selectCountry,
    handleGrossChange,
    state: { loadingData, countryList, selectedCountry },
  } = useTaxCalculator();
  const {
    employer: { healthInsurance, socialSecurity, payrollTax },
    employee: { socialSecurity: employeeSecurity, incomeTax },
  } = output;

  if (loadingData)
    return (
      <Center>
        <strong>LOADING DATA...</strong>
      </Center>
    );
  return (
    <div>
      <Input>
        <div>
          <p>Select your country: </p>
          <div>
            <SelectField
              name="country"
              disabled={!countryList.length}
              onChange={(e) => selectCountry(e.target.value)}
            >
              <option value="">Select one</option>
              {countryList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </SelectField>
          </div>
        </div>
        <div>
          <p>Enter gross salary: </p>
          <div>
            <InputField
              type="number"
              name="gross"
              value={currentGross}
              onChange={(e) => handleGrossChange(e.target.value)}
            />
          </div>
        </div>
      </Input>
      <Output>
        <div>
          <SpaceBottom>Employer taxes</SpaceBottom>
          <div>
            <p>
              - Health Insurance: <strong>${ROUND(healthInsurance)}</strong>
            </p>
            <p>
              - Social Security: <strong>${ROUND(socialSecurity)}</strong>
            </p>
            <p>
              - Payroll Tax: <strong>${ROUND(payrollTax)}</strong>
            </p>
          </div>
          <SpaceTop>
            <p>
              - Total Cost:{" "}
              <strong>
                $
                {currentGross && selectedCountry
                  ? ROUND(
                      ROUND(currentGross) +
                        healthInsurance +
                        socialSecurity +
                        payrollTax
                    )
                  : 0}
              </strong>
            </p>
          </SpaceTop>
        </div>
        <Employee>
          <SpaceBottom>Employee taxes</SpaceBottom>
          <div>
            <p>
              - Social Security: <strong>${ROUND(employeeSecurity)}</strong>
            </p>
            <p>
              - Income Tax: <strong>${ROUND(incomeTax)}</strong>
            </p>
          </div>
          <SpaceTop>
            <p>
              - Net Salary:{" "}
              <strong>
                $
                {currentGross && selectedCountry
                  ? ROUND(currentGross - incomeTax - employeeSecurity)
                  : 0}
              </strong>
            </p>
          </SpaceTop>
        </Employee>
      </Output>
    </div>
  );
}

export default App;
