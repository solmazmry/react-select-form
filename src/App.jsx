// import React from "react"
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";
import { useEffect } from "react";
function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    trigger,
  } = useForm();

  //propsun icinde field gotururuk sonra onChange ve value
  //imputmuzu render ile yaradiriq
  const NameComponent = ({ field: { onChange, value }, fieldState }) => {
    return (
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={value}
          onChange={onChange}
          invalid={fieldState.invalid}
        />
        {fieldState.invalid && (
          <FormText color="danger">{fieldState.error.message}</FormText>
        )}
      </div>
    );
  };

  // selectimizin optionlarini burda yaziriq
  const countries = [
    {
      value: 1,
      label: "Azerbaijan",
    },
    {
      value: 2,
      label: "Germany",
    },
    {
      value: 3,
      label: "England",
    },
  ];

  //izleyirik watch ile azerbaijan secende  options={cities} vermekle seherleri secirik
  const country = watch("country");
  const isAzerbaijan = country?.value === 1;
  //selectinin valuesunu gotururusen onchange verirsen olke secimi
  const CountryComponent = ({ field: { onChange, value }, fieldState }) => {
    return (
      <div className="mt-3">
        <Label htmlFor="country" id="country" name>
          Country
        </Label>
        <Select
          options={countries}
          onChange={onChange}
          value={value}
          className={fieldState.invalid ? "is-invalid" : ""}
        />
        {fieldState.invalid && (
          <FormText color="danger">{fieldState.error.message}</FormText>
        )}
      </div>
    );
  };

  const cities = [
    {
      value: 1,
      label: "Baku",
    },
    {
      value: 2,
      label: "Absheron",
    },
    {
      value: 3,
      label: "Xirdalan",
    },
  ];

  const CityComponent = ({ field: { onChange, value }, fieldState }) => {
    return (
      <div className="mt-3">
        <Label htmlFor="city">City</Label>
        <Select
          options={cities}
          onChange={(option) => onChange(option)}
          value={value}
          className={fieldState.invalid ? "is-invalid" : ""}
        />
        {fieldState.invalid && (
          <FormText color="danger">{fieldState.error.message}</FormText>
        )}
      </div>
    );
  };

  //datalarimizi gotururuk
  const save = (values) => {
    console.log(values);
    reset({
      name: "",
      country: null,
      city: null,
    });
  };

  // secdiyimiz olke deyilse seherin deyerini  null et
  //setValue bizden 2 deyer isteyr neyi ne ile deyishim
  useEffect(() => {
    if (!isAzerbaijan) {
      setValue("city", null);
      trigger("city");
    }
  }, [isAzerbaijan, setValue, trigger]);

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col sm={12} md={4}>
          <form onSubmit={handleSubmit(save)}>
            <Card>
              <CardHeader>
                <CardTitle>Form</CardTitle>
              </CardHeader>
              <CardBody>
                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  render={NameComponent}
                />
                <Controller
                  name="country"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  render={CountryComponent}
                />

                {isAzerbaijan && (
                  <Controller
                    name="city"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }}
                    render={CityComponent}
                  />
                )}

                <Button className="mt-2" color="success" type="submit">
                  Submit
                </Button>
              </CardBody>
            </Card>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
