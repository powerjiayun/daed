import {
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { Fragment, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiDark, CiImport, CiLight, CiSquarePlus, CiStreamOff, CiStreamOn } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";

import { gqlClient } from "~/api";
import { COLS_PER_ROW, GET_LOG_LEVEL_STEPS, QUERY_KEY_CONFIG, QUERY_KEY_GROUP, QUERY_KEY_RUNNING } from "~/constants";
import { graphql } from "~/gql";
import { ConfigsQuery } from "~/gql/graphql";
import i18n from "~/i18n";
import { colsPerRowAtom } from "~/store";

import CreateConfigFormDrawer, { FormValues as CreateConfigFormDrawerFormValues } from "./CreateConfigFormDrawer";
import CreateGroupFormDrawer, { FormValues as CreateGroupFormDrawerFormValues } from "./CreateGroupFormDrawer";

export default () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const colsPerRow = useStore(colsPerRowAtom);

  const {
    isOpen: isConfigFormDrawerOpen,
    onOpen: onConfigFormDrawerOpen,
    onClose: onConfigFormDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isGroupFormDrawerOpen,
    onOpen: onGroupFormDrawerOpen,
    onClose: onGroupFormDrawerClose,
  } = useDisclosure();

  const isRunningQuery = useQuery(QUERY_KEY_RUNNING, async () =>
    gqlClient.request(
      graphql(`
        query Running {
          general {
            dae {
              running
            }
          }
        }
      `)
    )
  );

  const runMutation = useMutation({
    mutationFn: () => {
      return gqlClient.request(
        graphql(`
          mutation Run($dry: Boolean!) {
            run(dry: $dry)
          }
        `),
        { dry: false }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_RUNNING });
    },
  });

  const createConfigMutation = useMutation({
    mutationFn: (values: CreateConfigFormDrawerFormValues) => {
      const {
        logLevelIndex,
        checkIntervalSeconds,
        checkTolerenceMS: checkTolerenceMS,
        dns,
        routing,
        ...global
      } = values;

      return gqlClient.request(
        graphql(`
          mutation createConfig($global: globalInput, $dns: String, $routing: String) {
            createConfig(global: $global, dns: $dns, routing: $routing) {
              id
            }
          }
        `),
        {
          global: {
            logLevel: GET_LOG_LEVEL_STEPS(t)[logLevelIndex][1],
            checkInterval: `${checkIntervalSeconds}s`,
            checkTolerance: `${checkTolerenceMS}ms`,
            ...global,
          },
          dns,
          routing,
        }
      );
    },
    onSuccess: (data) => {
      toast({
        title: "Config Created",
        description: `${data.createConfig.id}`,
        status: "success",
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_CONFIG });
      onConfigFormDrawerClose();
    },
  });

  const createGroupMutation = useMutation({
    mutationFn: (values: CreateGroupFormDrawerFormValues) => {
      return gqlClient.request(
        graphql(`
          mutation createGroup($name: String!, $policy: Policy!, $policyParams: [PolicyParam!]) {
            createGroup(name: $name, policy: $policy, policyParams: $policyParams) {
              id
            }
          }
        `),
        values
      );
    },
    onSuccess: (data) => {
      toast({
        title: "Group Created",
        description: `${data.createGroup.id}`,
        status: "success",
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_GROUP });
      onGroupFormDrawerClose();
    },
  });

  const switchLanguage = () => {
    if (i18n.language.startsWith("zh")) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("zh-Hans");
    }
  };

  const platform = useRef<HTMLDivElement>(null);
  const dae = useRef<HTMLImageElement>(null);
  const [showSave, setShowSave] = useState(false);
  const x = useMotionValue(0);
  const y = useSpring(0);

  useMotionValueEvent(y, "change", (latest) => {
    const platformBottomLimit = platform.current?.clientHeight;
    const daeHeight = dae.current?.clientHeight;

    if (!platformBottomLimit || !daeHeight) {
      return;
    }

    if (latest >= platformBottomLimit - daeHeight) {
      setShowSave(true);
    } else {
      setShowSave(false);
    }
  });

  return (
    <Flex
      ref={platform}
      h="full"
      alignItems="center"
      justifyContent="center"
      direction="column"
      px={2}
      pt={6}
      pb={12}
      gap={4}
    >
      <motion.div
        drag
        style={{ x, y, zIndex: Number.MAX_SAFE_INTEGER, height: showSave ? 0 : "auto" }}
        dragConstraints={{ left: 0, right: 0, top: 0 }}
      >
        <Image ref={dae} draggable={false} m={10} boxSize={24} rounded="md" src="/logo.svg" alt="logo" />
      </motion.div>

      <Button w="full" leftIcon={<CiSquarePlus />} onClick={onConfigFormDrawerOpen}>
        {`${t("create")} ${t("config")}`}
      </Button>

      <Button w="full" leftIcon={<CiSquarePlus />} onClick={onGroupFormDrawerOpen}>
        {`${t("create")} ${t("group")}`}
      </Button>

      <Button w="full" leftIcon={<CiImport />} onClick={onConfigFormDrawerOpen}>
        {`${t("import")} ${t("node")}`}
      </Button>

      <Button w="full" leftIcon={<CiImport />} onClick={onConfigFormDrawerOpen}>
        {`${t("import")} ${t("subscription")}`}
      </Button>

      <Spacer />

      <Flex direction="column" gap={4}>
        <Slider
          min={1}
          max={5}
          defaultValue={COLS_PER_ROW}
          value={colsPerRow}
          textAlign="center"
          onChange={colsPerRowAtom.set}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>

          <SliderThumb />
        </Slider>

        <Flex gap={4}>
          <IconButton
            aria-label={isRunningQuery.data?.general.dae.running ? t("connected") : t("disconnected")}
            icon={isRunningQuery.data?.general.dae.running ? <CiStreamOn /> : <CiStreamOff />}
            onClick={() => {
              if (isRunningQuery.data?.general.dae.running) {
                return;
              }

              if (!queryClient.getQueryData<ConfigsQuery>(QUERY_KEY_CONFIG)?.configs.some(({ selected }) => selected)) {
                toast({
                  title: t("please select a config first"),
                  status: "error",
                });

                return;
              }

              runMutation.mutate();
            }}
          />

          <IconButton aria-label={t("switchLanguage")} icon={<HiLanguage />} onClick={switchLanguage} />

          <IconButton
            aria-label={t("dark mode")}
            icon={colorMode === "dark" ? <CiDark /> : <CiLight />}
            onClick={toggleColorMode}
          />
        </Flex>

        {showSave && (
          <Center alignItems="center">
            <Button onClick={() => y.jump(0)}>Save the goose</Button>
          </Center>
        )}
      </Flex>

      <Fragment>
        <CreateConfigFormDrawer
          isOpen={isConfigFormDrawerOpen}
          onClose={onConfigFormDrawerClose}
          onSubmit={async (form) => {
            await createConfigMutation.mutateAsync(form.getValues());
          }}
        />

        <CreateGroupFormDrawer
          isOpen={isGroupFormDrawerOpen}
          onClose={onGroupFormDrawerClose}
          onSubmit={async (form) => {
            await createGroupMutation.mutateAsync(form.getValues());
          }}
        />
      </Fragment>
    </Flex>
  );
};
