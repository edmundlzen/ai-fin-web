import { Formik, Form, ErrorMessage } from "formik";
import Modal from "react-responsive-modal";
import { Emoji } from ".";
import * as Yup from "yup";
import { useState } from "react";
import emojis from "~/emojis.json";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { graphql } from "~/gql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { Voucher } from "~/gql/graphql";

const VoucherSchema = Yup.object().shape({
  imageUrl: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  levelRequired: Yup.number().required("Required"),
  terms: Yup.string().required("Required"),
});

const MAX_EMOJIS_PER_PAGE = 20;

const CREATE_VOUCHER = graphql(`
  mutation CreateVoucher($createVoucherInput: CreateVoucherInput!) {
    createVoucher(createVoucherInput: $createVoucherInput) {
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

const UPDATE_VOUCHER = graphql(`
  mutation UpdateVoucher($updateVoucherInput: UpdateVoucherInput!) {
    updateVoucher(updateVoucherInput: $updateVoucherInput) {
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

const DELETE_VOUCHER = graphql(`
  mutation RemoveVoucher($removeVoucherId: String!) {
    removeVoucher(id: $removeVoucherId) {
      id
    }
  }
`);

const CrudVoucherModal = ({
  isOpen,
  onClose,
  onSuccess,
  oldVoucher,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  oldVoucher?: Voucher | null;
}) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emojiSearchQuery, setEmojiSearchQuery] = useState("");
  const [emojiPage, setEmojiPage] = useState(0);
  const [createVoucher] = useMutation(CREATE_VOUCHER);
  const [updateVoucher] = useMutation(UPDATE_VOUCHER);
  const [deleteVoucher] = useMutation(DELETE_VOUCHER);

  const onDelete = async () => {
    if (oldVoucher) {
      await deleteVoucher({
        variables: {
          removeVoucherId: oldVoucher.id,
        },
      });
      toast.success("Voucher deleted successfully");
      onSuccess?.();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      showCloseIcon={false}
      classNames={{
        modal: "rounded-lg w-10/12",
      }}
    >
      <h2 className="text-xl font-semibold">
        {oldVoucher ? "Edit" : "Add"} a new voucher
      </h2>
      <div className="mt-3">
        <Formik
          initialValues={
            oldVoucher
              ? {
                  imageUrl: oldVoucher.imageUrl,
                  name: oldVoucher.name,
                  levelRequired: oldVoucher.levelRequired,
                  terms: oldVoucher.terms,
                  code: oldVoucher.code,
                }
              : {
                  imageUrl: "https://via.placeholder.com/150",
                  name: "",
                  levelRequired: 0,
                  terms: "",
                  code: "",
                }
          }
          enableReinitialize
          validationSchema={VoucherSchema}
          onSubmit={async (values) => {
            try {
              const variables = {
                variables: {
                  createVoucherInput: {
                    imageUrl: values.imageUrl,
                    name: values.name,
                    levelRequired: +values.levelRequired,
                    terms: values.terms,
                    code: values.code,
                  },
                },
              };
              if (oldVoucher) {
                await updateVoucher({
                  variables: {
                    updateVoucherInput: {
                      id: oldVoucher.id,
                      ...variables.variables.createVoucherInput,
                    },
                  },
                });
              } else {
                await createVoucher(variables);
              }
            } catch (error) {
              toast.error("An error occurred");
            }
            toast.success(
              `Financial goal ${oldVoucher ? "edited" : "added"} successfully`,
            );
            onSuccess?.();
            onClose();
          }}
          validateOnMount
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-y-4">
              <div className="flex flex-col items-start gap-x-4">
                <label htmlFor="name" className="w-full font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                  value={values.name}
                  onChange={(e) => {
                    void setFieldValue("name", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col items-start gap-x-4">
                <label htmlFor="levelRequired" className="w-full font-medium">
                  Level Required
                </label>
                <input
                  type="number"
                  name="levelRequired"
                  id="levelRequired"
                  className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                  inputMode="numeric"
                  value={values.levelRequired}
                  onKeyDown={(e) => {
                    // Only allow numbers
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Delete" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight" ||
                        e.key === "ArrowUp" ||
                        e.key === "ArrowDown" ||
                        e.key === "Tab"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    void setFieldValue("levelRequired", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="levelRequired"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col items-start gap-x-4">
                <label htmlFor="terms" className="w-full font-medium">
                  Terms
                </label>
                <textarea
                  name="terms"
                  id="terms"
                  className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                  value={values.terms}
                  onChange={(e) => {
                    void setFieldValue("terms", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col items-start gap-x-4">
                <label htmlFor="imageUrl" className="w-full font-medium">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                  value={values.imageUrl}
                  onChange={(e) => {
                    void setFieldValue("imageUrl", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col items-start gap-x-4">
                <label htmlFor="code" className="w-full font-medium">
                  Code
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                  value={values.code}
                  onChange={(e) => {
                    void setFieldValue("code", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-6 flex items-center justify-end">
                {oldVoucher ? (
                  <button
                    type="button"
                    onClick={async () => {
                      await onDelete();
                      onClose();
                    }}
                    className="btn btn-outline btn-error mr-auto"
                  >
                    <Icon icon="bi:trash" />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="btn btn-ghost w-24"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-4 w-24 rounded-lg border border-secondary bg-tertiary p-3 text-sm font-bold text-primary transition-all hover:bg-secondary active:scale-95"
                  disabled={isSubmitting}
                >
                  {oldVoucher ? "Edit" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CrudVoucherModal;
