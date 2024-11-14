"use client";

import { OptionMultiCount } from "@/components/_commons/OptionMultiCount";
import { useSnapshot } from "valtio/react";
import { storeOption } from "@/valtio/option.valtio";

export const OptionMultiCountLogic = () => {
  const { multiCount } = useSnapshot(storeOption);

  const handleChange = (value: string, title: string) => {
    const storageKey = `multiCount_${title}`;
    localStorage.setItem(storageKey, value);
    const countIndex = storeOption.multiCount.findIndex(
      (item) => item.title === title,
    );
    if (countIndex !== -1) {
      storeOption.multiCount[countIndex].count = parseInt(value);
    }
  };

  const getSavedValue = (title: string) => {
    const storageKey = `multiCount_${title}`;
    const savedValue = localStorage.getItem(storageKey);
    if (!savedValue) {
      localStorage.setItem(storageKey, "1");
      return "1";
    }

    // valtio store 초기값 설정
    const countIndex = storeOption.multiCount.findIndex(
      (item) => item.title === title,
    );
    if (countIndex !== -1) {
      storeOption.multiCount[countIndex].count = parseInt(savedValue);
    }

    return savedValue;
  };

  return (
    <OptionMultiCount
      multiCount={multiCount}
      handleChange={handleChange}
      getSavedValue={getSavedValue}
    />
  );
};
