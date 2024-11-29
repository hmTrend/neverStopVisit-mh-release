import { Stack, Switch } from "@chakra-ui/react";
import { storeStart } from "@/valtio/start.valtio";

export const StartStateSwitch = ({ selectProgram }) => {
  const handleChange = (e) => {
    const checked = e.target.checked;
    console.log("Switch is:", checked ? "ON" : "OFF");
    if (checked) {
      storeStart[selectProgram].isStart = true;
      return;
    }
    storeStart[selectProgram].isStart = false;
  };

  return (
    <Stack align="center" direction="row">
      <Switch size="lg" onChange={handleChange} />
    </Stack>
  );
};
