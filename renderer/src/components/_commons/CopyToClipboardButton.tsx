import { IconButton, useToast, Tooltip } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

interface CopyToClipboardButtonProps {
  value: string;
  tooltipText?: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  value,
  tooltipText = "클립보드에 복사",
}) => {
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "복사 완료",
        description: "클립보드에 복사되었습니다.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "클립보드 복사에 실패했습니다.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Tooltip label={tooltipText}>
      <IconButton
        aria-label="Copy to clipboard"
        icon={<CopyIcon />}
        size="sm"
        variant="ghost"
        onClick={handleCopy}
      />
    </Tooltip>
  );
};

export default CopyToClipboardButton;
