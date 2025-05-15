"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, LayoutGrid, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ColorPicker } from "@/components/color-picker";
import { UploadButton } from "@/components/uploadthing";

import { FrameSchema, FrameType } from "@/schemas/frame";
import { useCreateFrame } from "../api/use-create-frame";

export const FrameForm = () => {
    // MUTATION
    const { mutate: createFrame, isPending } = useCreateFrame();

    // HANDLE ADD VARIANT
    const handleAddVariant = () => {
        append({
            size: "",
            color: "",
            price: "",
            stock: "",
        });
    }

    // FORM
    const form = useForm<FrameType>({
        resolver: zodResolver(FrameSchema),
        defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
            variants: [{
                size: "",
                color: "#000000",
                price: "",
                stock: "",
            }],
        },
    })

    // FIELD ARRAY
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "variants",
    })

    // ON SUBMIT
    const onSubmit = async (data: FrameType) => {
        createFrame(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>New Frame</CardTitle>
                        <CardDescription>Create a new frame</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    {form.watch("imageUrl") ? (
                                        <div className="relative">
                                            <Image
                                                src={form.watch("imageUrl")}
                                                alt="Frame"
                                                width={100}
                                                height={100}
                                                className="rounded-md"
                                                unoptimized
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => form.setValue("imageUrl", "")}
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0"
                                                disabled={isPending}
                                            >
                                                <Trash2 className="w-5 h-5 text-rose-500" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <UploadButton
                                            endpoint="imageUploader"
                                            appearance={{
                                                container: "flex flex-col items-center gap-2 p-4 border border-border rounded-lg bg-muted text-foreground w-full",
                                                button:
                                                    "bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium",
                                                allowedContent: "text-xs text-muted-foreground",
                                            }}
                                            onClientUploadComplete={(res) => {
                                                field.onChange(res?.[0]?.ufsUrl);
                                                toast.success("Image uploaded");
                                            }}
                                            onUploadError={() => {
                                                toast.error("Image upload failed");
                                            }}
                                        />
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2 shadow-sm rounded-md py-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
                                    <LayoutGrid className="h-4 w-4" />
                                </div>
                                <Label className="text-lg font-medium">Variants</Label>
                            </div>

                            {
                                fields.map((field, index) => (
                                    <Collapsible key={field.id} defaultOpen={index === 0} className="border border-muted rounded-md p-4">
                                        <CollapsibleTrigger asChild>
                                            <div className="flex items-center gap-2 w-full justify-between">
                                                <Button type="button" variant="secondary" size="icon" disabled={index === 0 || isPending} onClick={() => remove(index)}>
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                                <Button disabled={isPending} type="button" variant="secondary" className="flex-1">
                                                    {form.watch(`variants.${index}.size`) || `Variant ${index + 1}`}
                                                    <ChevronsUpDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                                </Button>
                                            </div>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="space-y-4 mt-2">
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.size`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Size</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} disabled={isPending} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.color`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Color</FormLabel>
                                                        <FormControl>
                                                            <ColorPicker {...field} disabled={isPending} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.price`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} disabled={isPending} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.stock`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Stock</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} disabled={isPending} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))
                            }

                            <Button disabled={isPending} type="button" variant="outline" onClick={handleAddVariant}>
                                Add Variant
                            </Button>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button disabled={isPending} type="submit">Submit</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}