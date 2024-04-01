import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Box } from "~/components";
import TopBar from "~/components/TopBar";
import { graphql } from "~/gql";
import { Voucher } from "~/gql/graphql";

const GET_ALL_VOUCHERS = graphql(`
  query GetAllVouchers {
    voucher {
      id
      imageUrl
      name
      levelRequired
      terms
      createdAt
      updatedAt
    }
  }
`);

export default function Vouchers() {
  const [newVoucherModalOpen, setNewVoucherModalOpen] = useState(false);
  const { data, loading, refetch } = useQuery<{ voucher: Voucher[] }>(
    GET_ALL_VOUCHERS,
  );

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <TopBar title="Vouchers" />
      <Box className="flex h-fit w-full flex-col items-center p-3">
        <h2 className="w-full text-xl font-bold tracking-tight">Vouchers</h2>
        <div className="flex w-full items-baseline">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data?.voucher.map((voucher) => (
              <div key={voucher.id} className="flex flex-col items-center p-2">
                <img
                  src={voucher.imageUrl}
                  alt={voucher.name}
                  className="h-24 w-24"
                />
                <p>{voucher.name}</p>
                <p>Level Required: {voucher.levelRequired}</p>
                <p>Terms: {voucher.terms}</p>
                <p>Created At: {voucher.createdAt}</p>
                <p>Updated At: {voucher.updatedAt}</p>
              </div>
            ))
          )}
        </div>
      </Box>
    </main>
  );
}
