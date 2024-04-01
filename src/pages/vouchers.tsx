import { useMutation, useQuery } from "@apollo/client";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useEffect, useState } from "react";
import { Box, CrudVoucherModal } from "~/components";
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
      code
    }
  }
`);

export default function Vouchers() {
  const [newVoucherModalOpen, setNewVoucherModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const { data, loading, refetch } = useQuery<{ voucher: Voucher[] }>(
    GET_ALL_VOUCHERS,
  );

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <CrudVoucherModal
        oldVoucher={selectedVoucher}
        isOpen={newVoucherModalOpen}
        onClose={() => setNewVoucherModalOpen(false)}
        onSuccess={() => {
          void refetch();
        }}
      />
      <TopBar title="Vouchers" />
      <Box className="flex h-fit w-full flex-col items-center p-3">
        <h2 className="w-full text-xl font-bold tracking-tight">Vouchers</h2>
        <div className="mt-2 flex w-full flex-col items-center gap-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data?.voucher.map((voucher) => (
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
                onClickEdit={() => {
                  setSelectedVoucher(voucher);
                  setNewVoucherModalOpen(true);
                }}
              />
            ))
          )}
          <button
            className="flex w-full items-center justify-center rounded-lg border border-slate-200 p-3 text-sm font-bold transition-all hover:bg-slate-100 active:scale-95"
            onClick={() => {
              setSelectedVoucher(null);
              setNewVoucherModalOpen(true);
            }}
          >
            <Icon icon="bi:plus" className="text-2xl" />
            Add a new voucher
          </button>
        </div>
      </Box>
    </main>
  );
}

const VoucherCard = ({
  voucher,
  onClickEdit,
}: {
  voucher: Voucher;
  onClickEdit?: () => void;
}) => {
  return (
    <Box className="flex w-full gap-x-3 p-3">
      <img
        src={voucher.imageUrl}
        alt={voucher.name}
        className="h-16 w-16 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-y-1">
        <h3 className="text-lg font-bold">{voucher.name}</h3>
        <p className="text-sm font-light">{voucher.terms}</p>
        <p className="text-sm font-light">
          Level Required: {voucher.levelRequired}
        </p>
      </div>
      <div className="flex flex-1 items-center justify-end gap-y-1">
        <button onClick={onClickEdit} className="btn btn-primary ml-2">
          Edit
        </button>
      </div>
    </Box>
  );
};
