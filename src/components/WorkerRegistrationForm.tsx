import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";

// Form schema for worker registration
const formSchema = z.object({
  gender: z.enum(["male", "female"], {
    message: "Field required!",
  }),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    message: "Field required!",
  }),
  department: z.string(),
  kkj: z
    .string()
    .min(2, { message: "Enter a valid KKJ number!" })
    .max(10, { message: "Enter a valid KKJ number!" }),
  kom: z.boolean(),
  baptis: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const WorkerRegistrationForm = () => {
  const [openGenderBox, setOpenGenderBox] = useState(false);
  const [openMarriageBox, setOpenMarriageBox] = useState(false);
  const [openDepartmentBox, setOpenDepartmentBox] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
      kkj: "",
      kom: false,
      baptis: false,
    },
  });
  const { control } = useFormContext(); // Get the context from the parent form

  return (
    <>
      <Form {...form}>
        <form className="md:space-y-6 md:w-1/3">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-col my-5">
                <FormLabel>Gender</FormLabel>
                <Popover open={openGenderBox} onOpenChange={setOpenGenderBox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[200px] justify-between"
                    >
                      {field.value || "Select Gender"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("Male");
                              setOpenGenderBox(false);
                            }}
                          >
                            Male
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("Female");
                              setOpenGenderBox(false);
                            }}
                          >
                            Female
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kkj"
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>KKJ Number</FormLabel>
                <FormControl>
                  <Input
                    className="shadow-md focus-visible:ring-primary-light"
                    placeholder="Enter your KKJ number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem className="flex flex-col my-5">
                <FormLabel>Marital Status</FormLabel>
                <Popover
                  open={openMarriageBox}
                  onOpenChange={setOpenMarriageBox}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[200px] justify-between"
                    >
                      {field.value || "Select your status"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("Single");
                              setOpenMarriageBox(false);
                            }}
                          >
                            Single
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("Married");
                              setOpenMarriageBox(false);
                            }}
                          >
                            Married
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("Divorced");
                              setOpenMarriageBox(false);
                            }}
                          >
                            Divorced
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("Widowed");
                              setOpenMarriageBox(false);
                            }}
                          >
                            Widowed
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="my-5 flex flex-col ">
                <FormLabel>Department</FormLabel>
                <Popover
                  open={openDepartmentBox}
                  onOpenChange={setOpenDepartmentBox}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[200px] justify-between"
                    >
                      {field.value || "Select your department"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("Excom");
                              setOpenDepartmentBox(false);
                            }}
                          >
                            Excom
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("MIS");
                              setOpenDepartmentBox(false);
                            }}
                          >
                            MIS
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              field.onChange("Pastoral");
                              setOpenDepartmentBox(false);
                            }}
                          >
                            Pastoral
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kom"
            render={({ field }) => (
              <FormItem className="my-5 flex items-center">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)} // Updates the state
                  />
                </FormControl>
                <FormLabel className="ml-2">I have attended KOM</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="baptis"
            render={({ field }) => (
              <FormItem className="my-5 flex items-center">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)} // Updates the state
                  />
                </FormControl>
                <FormLabel className="ml-2">I have been baptized</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kom"
            render={({ field }) => (
              <FormItem className="my-5 flex items-center">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)} // Updates the state
                  />
                </FormControl>
                <FormLabel className="ml-2">I have attended KOM</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="baptis"
            render={({ field }) => (
              <FormItem className="my-5 flex items-center">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)} // Updates the state
                  />
                </FormControl>
                <FormLabel className="ml-2">I have been baptized</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default WorkerRegistrationForm;
