import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

CreateCabinForm.propTypes = {
  cabin: PropTypes.object,
  closeModal: PropTypes.func,
};

function CreateCabinForm({
  cabin: { id, name, maxCapacity, regularPrice, discount, image, description } = {},
  closeModal,
}) {
  const updateSession = Boolean(id);
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: updateSession ? { name, maxCapacity, regularPrice, discount, image, description } : {},
  });

  function onSubmit(values) {
    if (updateSession)
      updateCabin(
        {
          newCabin: { ...values, image: typeof values?.image === "string" ? values?.image : values?.image[0] },
          id,
        },
        {
          onSuccess: () => {
            reset();
            closeModal();
          },
        }
      );
    else
      createCabin(
        { ...values, image: values?.image[0] },
        {
          onSuccess: () => {
            reset();
            closeModal();
          },
        }
      );
  }

  // function onError(values) {
  //   console.log(values);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={close ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isCreating || isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Max Capacity must be at least 1",
            },
          })}
          disabled={isCreating || isUpdating}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
          })}
          disabled={isCreating || isUpdating}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => +value <= +getValues().regularPrice || "Discount can't be heigher than the price",
          })}
          disabled={isCreating || isUpdating}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isCreating || isUpdating}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: updateSession ? false : "Cabin image is required",
          })}
          disabled={isCreating || isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={closeModal}>
          Cancel
        </Button>
        <Button disabled={isCreating || isUpdating}>{updateSession ? "Edit" : "Add"} cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
