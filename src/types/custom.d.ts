import type { NextPage } from "next";

  export type  ProtectedPage  =   {
    auth?:boolean
  } & NextPage 