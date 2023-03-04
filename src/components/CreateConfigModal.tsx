import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Field from "./Field";
import NumberInput from "./NumberInput";

export type FormValues = {
  tproxyPort: number;
  logLevel: number;
  tcpCheckUrl: string;
  udpCheckDns: string;
  checkInterval: number;
  checkTolerence: number;
  dnsUpstream: string;
  lanInterface: string[];
  lanNatDirect: boolean;
  wanInterface: string[];
  allowInsecure: boolean;
  dialMode: string;
};

const sliderLabelStyles = {
  mt: 2,
  ml: "-50%",
  w: "full",
  fontSize: "sm",
};

export default ({
  isOpen,
  onClose,
  submitHandler,
}: {
  isOpen: boolean;
  submitHandler: (values: FormValues) => Promise<void>;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <form onSubmit={handleSubmit(submitHandler)}>
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>{t("create config")}</ModalHeader>

          <ModalBody>
            <Flex direction="column" gap={4}>
              <Field labelNode={`${t("tproxyPort")} (0-65535)`}>
                <Controller
                  name="tproxyPort"
                  control={control}
                  render={({ field }) => <NumberInput min={0} max={65535} defaultValue={12345} {...field} />}
                />
              </Field>

              <Field labelNode={t("logLevel")} pb={4}>
                <Controller
                  name="logLevel"
                  control={control}
                  render={({ field }) => (
                    <Slider step={25} textAlign="center" {...field}>
                      <SliderMark value={25} {...sliderLabelStyles}>
                        {t("warn")}
                      </SliderMark>
                      <SliderMark value={50} {...sliderLabelStyles}>
                        {t("info")}
                      </SliderMark>
                      <SliderMark value={75} {...sliderLabelStyles}>
                        {t("debug")}
                      </SliderMark>

                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>

                      <SliderThumb />
                    </Slider>
                  )}
                />
              </Field>

              <Field labelNode={t("tcpCheckUrl")}>
                <Input {...register("tcpCheckUrl")} />
              </Field>

              <Field labelNode={t("udpCheckDns")}>
                <Input {...register("udpCheckDns")} />
              </Field>

              <Field labelNode={`${t("checkInterval")} (${t("ms")})`} {...register("checkInterval")}>
                <Controller
                  name="checkInterval"
                  control={control}
                  render={({ field }) => <NumberInput min={0} defaultValue={1000} {...field} />}
                />
              </Field>

              <Field labelNode={`${t("checkTolerance")} (${t("ms")})`} {...register("checkTolerence")}>
                <Controller
                  name="checkTolerence"
                  control={control}
                  render={({ field }) => <NumberInput min={0} defaultValue={1000} {...field} />}
                />
              </Field>

              <Field labelNode={t("dnsUpstream")}>
                <Input {...register("dnsUpstream")} />
              </Field>

              <Field labelNode={t("lanInterface")} isRequired>
                <Input {...register("lanInterface")} />
              </Field>

              <Field labelNode={t("lanNatDirect")}>
                <Controller
                  name="lanNatDirect"
                  control={control}
                  render={({ field: { value: isChecked, ...field } }) => <Switch isChecked={isChecked} {...field} />}
                />
              </Field>

              <Field labelNode={t("wanInterface")} isRequired>
                <Input {...register("wanInterface")} />
              </Field>

              <Field labelNode={t("allowInsecure")}>
                <Switch {...register("allowInsecure")} />
              </Field>

              <Field labelNode={t("dialMode")}>
                <Select {...register("dialMode")}>
                  <option>ip</option>
                  <option>domain</option>
                  <option>domain+</option>
                </Select>
              </Field>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex gap={2}>
              <Button onClick={onClose}>{t("cancel")}</Button>

              <Button type="submit" isLoading={isSubmitting} bg="Highlight">
                {t("confirm")}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};