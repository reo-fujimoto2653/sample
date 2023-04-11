import { Inquiry } from "@prisma/client";
import inquiries from "./api/inquiries";

import type { NextPage } from "next";
import useSWR from "swr";
import { useState } from "react";
// import { Inquiry } from "@prisma/client";

type Inquiries = Array<Inquiry>;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const { data, error, mutate } = useSWR<Inquiries>("/api/inquiries", fetcher);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("/api/inquiries", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearForm();
    mutate();
  };

  if (error) return <div>Error has occurred</div>;
  if (!data) return <div>Now loading...</div>;

  return (
    <div className="container mx-auto">
      <table className="x-full text-sm text-left text-gray-500 mt-3">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Subject</th>
            <th className="py-3 px-6">Message</th>
          </tr>
        </thead>
        <tbody>
          {data.map((inquiry) => {
            return (
              <tr className="bg-white border-b" key={inquiry.id}>
                <td className="py-4 px-6">{inquiry.name}</td>
                <td className="py-4 px-6">{inquiry.email}</td>
                <td className="py-4 px-6">{inquiry.subject}</td>
                <td className="py-4 px-6">{inquiry.message}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
