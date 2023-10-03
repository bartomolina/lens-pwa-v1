"use client";

import { disconnect } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { isAuthenticated } from "@/lib/lens/auth";
import { clearAuthenticationToken } from "@/lib/state";
import { Login } from "@/ui/login";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/feed");
    }
  }, [router]);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return (
    <Page>
      <Navbar title="Login" />
      <BlockTitle>Wallet</BlockTitle>
      <List strongIos insetIos>
        <ListButton onClick={() => open()}>
          {isConnected ? "Account" : "Connect"}
        </ListButton>
        {isConnected && (
          <>
            <ListButton
              onClick={() => {
                clearAuthenticationToken();
                disconnect();
              }}
            >
              Disconnect
            </ListButton>
          </>
        )}
      </List>
      {isConnected && <Login />}
    </Page>
  );
}
