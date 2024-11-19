import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { storeAuth } from "@/valtio/member.valtio";

export const LoginApp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  useEffect(() => {
    const savedUserId = localStorage.getItem("userEmail");
    setEmail(savedUserId);
    const savedPassword = localStorage.getItem("password");
    setPassword(savedPassword);
  }, []);

  const handleLogin = () => {
    if (email === "qwas10040@gmail.com" && password === "ccuba2320@") {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("password", password);
      storeAuth.userId = true;
      toast({
        title: "로그인 성공",
        status: "success",
      });
    } else {
      localStorage.setItem("userId", "");
      localStorage.setItem("userEmail", "");
      storeAuth.userId = false;
      toast({
        title: "로그인 실패",
        status: "error",
      });
    }
  };

  return (
    <Container maxW="md" py={{ base: "12", md: "24" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Heading size={{ base: "xs", md: "sm" }}>
            Log in to your account
          </Heading>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
          </Stack>
          <Stack spacing="4">
            <Button onClick={handleLogin}>Log in</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
