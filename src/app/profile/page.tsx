"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "@/components/ui/command";
import departmentDatasets from "../../lib/datasets/departments_dataset.json";
import coolDatasets from "../../lib/datasets/cool_dataset.json";
import homebaseDatasets from "../../lib/datasets/homebase_dataset.json";
import categoryDatasets from "../../lib/datasets/cool_categories_dataset.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import HeaderNav from "@/components/HeaderNav";
import { set } from "lodash";

interface CategoryMap {
  [key: string]: string;
}

const Profile = () => {
  const { isAuthenticated, handleExpiredToken, getValidAccessToken } =
    useAuth();

  const router = useRouter();
  const { toast } = useToast();
  interface UserData {
    name: string;
    communityId: string;
    email: string;
    phoneNumber: string;
    placeOfBirth: string;
    dateOfBirth: Date;
    gender: string;
    maritalStatus: string;
    departmentCode: string;
    coolId: string;
    campusCode: string;
    userTypes: string[];
    isBaptized: boolean;
    isKom100: boolean;
  }

  const [userData, setUserData] = useState<UserData>({
    name: "",
    communityId: "",
    email: "",
    phoneNumber: "",
    placeOfBirth: "",
    dateOfBirth: new Date(),
    gender: "",
    maritalStatus: "",
    departmentCode: "",
    coolId: "",
    campusCode: "",
    userTypes: [],
    isBaptized: false,
    isKom100: false,
  });
  const categoryMap: CategoryMap = categoryDatasets.reduce((map, category) => {
    map[category.name.toUpperCase()] = category.code;
    return map;
  }, {} as CategoryMap);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (
      userData.userTypes?.includes("volunteer") ||
      userData.userTypes?.includes("admin") ||
      userData.userTypes?.includes("usher")
    ) {
      setIsWorker(true);
    } else {
      setIsWorker(false);
    }
  }, [userData]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [placeOfBirth, setPlaceOfBirth] = useState(userData.placeOfBirth);
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth);
  const [gender, setGender] = useState(userData.gender);
  const [maritalStatus, setMaritalStatus] = useState(userData.maritalStatus);
  const [department, setDepartment] = useState(userData.departmentCode);
  const [cool, setCool] = useState(userData.coolId);
  const [homebase, setHomebase] = useState(userData.campusCode);
  const [userTypes, setUserTypes] = useState(userData.userTypes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isWorker, setIsWorker] = useState<boolean>(false);
  const [openGenderBox, setOpenGenderBox] = useState(false);
  const [openMarriageBox, setOpenMarriageBox] = useState(false);
  const [openDepartmentBox, setOpenDepartmentBox] = useState(false);
  const [openCoolBox, setOpenCoolBox] = useState(false);
  const [openHomebaseBox, setOpenHomebaseBox] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCool, setSelectedCool] = useState("");
  const [selectedHomebase, setSelectedHomebase] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isBaptized, setIsBaptized] = useState(false);
  const [isKom100, setIsKom100] = useState(false);

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);
    setPlaceOfBirth(userData.placeOfBirth);
    setDateOfBirth(userData.dateOfBirth);
    setGender(userData.gender);
    setMaritalStatus(userData.maritalStatus);
    setDepartment(userData.departmentCode);
    setCool(userData.coolId);
    setHomebase(userData.campusCode);
    setUserTypes(userData.userTypes);
    setIsBaptized(userData.isBaptized);
    setIsKom100(userData.isKom100);
  }, [userData]);

  const getHomebaseName = (code: string) => {
    const homebase = homebaseDatasets.find((item) => item.code === code);
    return homebase ? homebase.homebase : "Select Homebase";
  };
  const getDepartmentName = (code: string) => {
    const department = departmentDatasets.find((item) => item.code === code);
    return department ? department.department : "Select Homebase";
  };
  const getCOOLName = (code: string) => {
    const cool = coolDatasets.find(
      (item) => item.no.toString() === code.toString()
    );
    return cool ? cool.cool : "Select COOL";
  };
  const handleSave = async () => {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      handleExpiredToken();
      return;
    }

    const communityId = userData.communityId; // Assuming communityId is part of userData

    const requestBody = {
      name,
      email,
      phoneNumber,
      gender,
      address: "", // Assuming address is not part of the form
      campusCode: homebase,
      placeOfBirth,
      dateOfBirth: format(dateOfBirth, "yyyy-MM-dd"),
      coolId: parseInt(cool),
      departmentCode: department,
      maritalStatus,
      dateOfMarriage: "", // Assuming dateOfMarriage is not part of the form
      employmentStatus: "", // Assuming employmentStatus is not part of the form
      educationLevel: "", // Assuming educationLevel is not part of the form
      kkjNumber: "", // Assuming kkjNumber is not part of the form
      jemaatId: "", // Assuming jemaatId is not part of the form
      isBaptized,
      isKom100,
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/v2/users/${communityId}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-API-Key": API_KEY || "",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          handleExpiredToken();
          return;
        }
        throw new Error("Failed to update user profile");
      }

      const updatedUserData = await response.json();
      const existingUserData = JSON.parse(
        localStorage.getItem("userData") || "{}"
      );
      const mergedUserData = { ...existingUserData, ...updatedUserData };
      localStorage.setItem("userData", JSON.stringify(mergedUserData));
      setUserData(mergedUserData);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        className: "bg-green-400",
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError("Failed to update user profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <HeaderNav name="Profile" link="home" />
      <div className="flex flex-col p-4 items-center justify-center w-full">
        <Card className="flex flex-col items-center gap-y-4 md:w-fit p-6 shadow-lg rounded-lg">
          <CardTitle className="text-2xl font-bold mb-4">
            Your Profile
          </CardTitle>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md p-2"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md p-2"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border rounded-md p-2"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="dateofBirth">Date of Birth</Label>
              <DatePicker
                className="border p-[0.4rem] mt-[0.25rem] rounded w-full"
                showYearDropdown
                yearDropdownItemNumber={80}
                scrollableYearDropdown
                selected={dateOfBirth}
                onChange={(date: Date | null) => date && setDateOfBirth(date)}
              />
            </div>
            {isWorker && (
              <>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="gender">Gender</Label>
                  <Popover open={openGenderBox} onOpenChange={setOpenGenderBox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between border rounded-md p-2"
                      >
                        {gender || "Select Gender"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setGender("male");
                                setOpenGenderBox(false);
                              }}
                            >
                              Male
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setGender("female");
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
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Popover
                    open={openMarriageBox}
                    onOpenChange={setOpenMarriageBox}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between border rounded-md p-2"
                      >
                        {maritalStatus || "Select Marital Status"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setMaritalStatus("single");
                                setOpenMarriageBox(false);
                              }}
                            >
                              Single
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setMaritalStatus("married");
                                setOpenMarriageBox(false);
                              }}
                            >
                              Married
                            </CommandItem>
                            <CommandItem
                              onSelect={() => {
                                setMaritalStatus("others");
                                setOpenMarriageBox(false);
                              }}
                            >
                              Others
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="department">Department</Label>
                  <Popover
                    open={openDepartmentBox}
                    onOpenChange={setOpenDepartmentBox}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between border rounded-md p-2"
                      >
                        {getDepartmentName(department)}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput />
                        <CommandList>
                          {departmentDatasets.map((item, index) => (
                            <CommandGroup key={index}>
                              <CommandItem
                                onSelect={() => {
                                  setDepartment(item.code.toUpperCase());
                                  setSelectedDepartment(
                                    item.department.toUpperCase()
                                  );
                                  setOpenDepartmentBox(false);
                                }}
                              >
                                <span className="font-medium">
                                  {item.department.toUpperCase()}
                                </span>
                              </CommandItem>
                            </CommandGroup>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="cool">COOL</Label>
                  <Popover open={openCoolBox} onOpenChange={setOpenCoolBox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between border rounded-md p-2"
                      >
                        {cool ? getCOOLName(cool) : "Select COOL"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search COOL..." />
                        <CommandList>
                          {coolDatasets.map((item, index) => (
                            <CommandGroup key={index} heading={item.category}>
                              <CommandItem
                                onSelect={() => {
                                  setCool(item.no.toString());
                                  setSelectedCool(item.cool);
                                  setOpenCoolBox(false);
                                }}
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {item.cool.toUpperCase()}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    Leader(s): {item.leader.toUpperCase()}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {item.campus.trim()}
                                  </span>
                                </div>
                              </CommandItem>
                            </CommandGroup>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="homebase">Homebase</Label>
                  <Popover
                    open={openHomebaseBox}
                    onOpenChange={setOpenHomebaseBox}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between border rounded-md p-2"
                      >
                        {getHomebaseName(homebase)}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandList>
                          {homebaseDatasets.map((item, index) => (
                            <CommandGroup key={index}>
                              <CommandItem
                                onSelect={() => {
                                  setHomebase(item.code.toUpperCase());
                                  setSelectedHomebase(item.homebase);
                                  setOpenHomebaseBox(false);
                                }}
                              >
                                <span className="font-medium">
                                  {item.homebase.toUpperCase()}
                                </span>
                              </CommandItem>
                            </CommandGroup>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid w-full items-center mt-2">
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="baptis"
                        checked={isBaptized}
                        onCheckedChange={(checked) => {
                          setIsBaptized(checked === true);
                        }}
                      />
                      <label
                        htmlFor="baptis"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Baptis
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="kom"
                        checked={isKom100}
                        onCheckedChange={(checked) => {
                          setIsKom100(checked === true);
                        }}
                      />
                      <label
                        htmlFor="kom"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Kom100
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="w-full flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.push("/home")}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => handleSave()}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Profile;
