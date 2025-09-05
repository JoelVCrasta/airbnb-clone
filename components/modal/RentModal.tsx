"use client"

import { use, useMemo, useState } from "react"
import { useSession } from "@/lib/auth/auth_client"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { rentSchema } from "@/utils/zod/rent-schema"
import axios from "axios"
import { getSignedUrls, uploadFilesToS3 } from "@/lib/listing"
import z from "zod"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import CategorySelect from "../rent/CategorySelect"
import CountrySelect from "../rent/CountrySelect"
import dynamic from "next/dynamic"
import CountInput from "../rent/CountInput"
import ImageUpload from "../rent/ImageUpload"
import { LuDollarSign } from "react-icons/lu"
import TextInput from "../TextInput"
import NumberInput from "../NumberInput"

enum STEPS {
  CATEGORY = 0,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const RentModal = () => {
  const session = useSession()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useRentModal()
  const [loading, setLoading] = useState<boolean>(false)
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY)

  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      images: [],
      category: "Beach",
      location: null,
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      price: "",
    },
  })

  const categoryWatch = watch("category")
  const locationWatch = watch("location")
  const guestCountWatch = watch("guestCount")
  const roomCountWatch = watch("roomCount")
  const bathroomCountWatch = watch("bathroomCount")
  const imagesWatch = watch("images")
  const titleWatch = watch("title")
  const descriptionWatch = watch("description")
  const priceWatch = watch("price")

  const setFormValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const label = useMemo(() => {
    return step === STEPS.PRICE ? "Create" : "Next"
  }, [step])

  const secondaryLabel = useMemo(() => {
    return step === STEPS.CATEGORY ? undefined : "Back"
  }, [step])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    console.log(data)
    setLoading(true)

    if (!session.data?.user) {
      toast.error("You must be logged in to create a listing.")
      setLoading(false)
      return
    }

    try {
      rentSchema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message)
      } else {
        toast.error("Invalid input data.")
      }

      setLoading(false)
      return
    }

    try {
      const urls = await getSignedUrls(data.images, "listing-images")
      const uploadedUrls = await uploadFilesToS3(data.images, urls)

      const payload = {
        userId: session.data.user.id,
        title: String(data.title).trim(),
        description: String(data.description).trim(),
        imageUrls: uploadedUrls,
        category: data.category,
        roomCount: data.roomCount,
        bathroomCount: data.bathroomCount,
        guestCount: data.guestCount,
        price: parseInt(data.price, 10),
        location,
      }

      const res = await axios.post("/api/add-listings", payload)
      if (res.data.success) {
        toast.success("Listing created successfully!")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        onClose()
      } else {
        toast.error("Something went wrong.")
      }
    } catch (error) {
      toast.error("Something went wrong.")
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [])

  const body = useMemo(() => {
    switch (step) {
      case STEPS.CATEGORY:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="What category does your home belong to?"
              subtitle="Choose a category"
            />
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 max-h[50vh] overflow-y-auto">
              {categories.map((category) => (
                <div key={category.label} className="col-span-1">
                  <CategorySelect
                    onClick={(c) => setFormValue("category", c)}
                    label={category.label}
                    icon={category.icon}
                    selected={categoryWatch === category.label}
                  />
                </div>
              ))}
            </div>
          </div>
        )

      case STEPS.LOCATION:
        return (
          <div className="felx flex-col space-y-8">
            <Heading
              title="Where is your home located?"
              subtitle="Select your location"
            />
            <CountrySelect
              value={locationWatch}
              onChange={(value) => setFormValue("location", value)}
            />
            <Map center={locationWatch?.latlng} />
          </div>
        )

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some info about your place"
              subtitle="What facilities do you have?"
            />
            <CountInput
              value={guestCountWatch}
              onChange={(value) => setFormValue("guestCount", value)}
              title="Guests"
              subTitle="How many guests do you allow?"
            />
            <hr />
            <CountInput
              value={roomCountWatch}
              onChange={(value) => setFormValue("roomCount", value)}
              title="Rooms"
              subTitle="How many rooms do you have?"
            />
            <hr />
            <CountInput
              value={bathroomCountWatch}
              onChange={(value) => setFormValue("bathroomCount", value)}
              title="Bathrooms"
              subTitle="How many bathrooms do you have?"
            />
          </div>
        )

      case STEPS.IMAGES:
        return (
          <div className="flex flex-col gap-4">
            <Heading
              title="Add pictures of your place"
              subtitle="Show guests what your place looks like!"
            />

            <ImageUpload
              value={imagesWatch}
              onChange={(value) => setFormValue("images", value)}
            />
          </div>
        )

      case STEPS.DESCRIPTION:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Describe your place"
              subtitle="What makes your place unique?"
            />

            <TextInput
              value={titleWatch}
              onChange={(value) => setFormValue("title", value)}
              placeholder="Title"
              required
            />

            <TextInput
              value={descriptionWatch}
              onChange={(value) => setFormValue("description", value)}
              placeholder="Description"
              required
            />
          </div>
        )

      case STEPS.PRICE:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Pricing"
              subtitle="How much do you want to charge?"
            />

            <NumberInput
              value={priceWatch}
              onChange={(value) => setFormValue("price", value)}
              placeholder="Price per night"
              required
              icon={LuDollarSign}
              min={1}
              max={100000}
            />
          </div>
        )
    }
  }, [
    step,
    categoryWatch,
    locationWatch,
    guestCountWatch,
    roomCountWatch,
    bathroomCountWatch,
    imagesWatch,
    titleWatch,
    descriptionWatch,
    priceWatch,
    Map,
  ])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="List your home"
      body={body}
      buttonLabel={label}
      disabled={loading}
      secondaryButton={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryButtonLabel={secondaryLabel}
    />
  )
}

export default RentModal
