"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";

const Profile = () => {
  const { isAuthenticated, handleExpiredToken, getValidAccessToken } =
    useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    placeOfBirth: "",
    dateOfBirth: new Date(),
    gender: "",
    maritalStatus: "",
    department: "",
    cool: "",
    homebase: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openGenderBox, setOpenGenderBox] = useState(false);
  const [openMarriageBox, setOpenMarriageBox] = useState(false);
  const [openDepartmentBox, setOpenDepartmentBox] = useState(false);
  const [openCoolBox, setOpenCoolBox] = useState(false);
  const [openHomebaseBox, setOpenHomebaseBox] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCool, setSelectedCool] = useState("");
  const [selectedHomebase, setSelectedHomebase] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSave = async () => {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      handleExpiredToken();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/v2/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-API-Key": API_KEY || "",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleExpiredToken();
          return;
        }
        throw new Error("Failed to update user data");
      }

      const data = await response.json();
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        className: "bg-green-400",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 md:flex md:flex-col md:items-center md:justify-center">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6 md:w-1/3">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <div className="flex gap-4 mt-2">
            <Input
              id="name"
              value={userData.name}
              disabled={!isEditing}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-4 mt-2">
            <Input
              id="email"
              type="email"
              value={userData.email}
              disabled={!isEditing}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <div className="flex gap-4 mt-2">
            <Input
              id="phoneNumber"
              value={userData.phoneNumber}
              disabled={!isEditing}
              onChange={(e) =>
                setUserData({ ...userData, phoneNumber: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor="placeOfBirth">Place of Birth</Label>
          <div className="flex gap-4 mt-2">
            <Input
              id="placeOfBirth"
              value={userData.placeOfBirth}
              disabled={!isEditing}
              onChange={(e) =>
                setUserData({ ...userData, placeOfBirth: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="flex gap-4 mt-2">
            <DatePicker
              id="dateOfBirth"
              selected={new Date(userData.dateOfBirth)}
              onChange={(date) =>
                setUserData({ ...userData, dateOfBirth: date || new Date() })
              }
              disabled={!isEditing}
              className="border p-2 rounded shadow-md focus-visible:ring-primary-light"
              showYearDropdown
              yearDropdownItemNumber={80}
              scrollableYearDropdown
              placeholderText="Select your date of birth"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <div className="flex gap-4 mt-2">
            <Popover open={openGenderBox} onOpenChange={setOpenGenderBox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  disabled={!isEditing}
                >
                  {userData.gender || "Select Gender"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setUserData({ ...userData, gender: "Male" });
                          setOpenGenderBox(false);
                        }}
                      >
                        Male
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setUserData({ ...userData, gender: "Female" });
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
        </div>

        <div>
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <div className="flex gap-4 mt-2">
            <Popover open={openMarriageBox} onOpenChange={setOpenMarriageBox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  disabled={!isEditing}
                >
                  {userData.maritalStatus || "Select Marital Status"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setUserData({ ...userData, maritalStatus: "single" });
                          setOpenMarriageBox(false);
                        }}
                      >
                        Single
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setUserData({
                            ...userData,
                            maritalStatus: "married",
                          });
                          setOpenMarriageBox(false);
                        }}
                      >
                        Married
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setUserData({ ...userData, maritalStatus: "others" });
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
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <div className="flex gap-4 mt-2">
            <Popover
              open={openDepartmentBox}
              onOpenChange={setOpenDepartmentBox}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  disabled={!isEditing}
                >
                  {selectedDepartment || "Select Department"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search department..." />
                  <CommandList>
                    {departmentDatasets.map((item, index) => (
                      <CommandGroup key={index}>
                        <CommandItem
                          onSelect={() => {
                            setUserData({
                              ...userData,
                              department: item.code.toUpperCase(),
                            });
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
        </div>

        <div>
          <Label htmlFor="cool">COOL</Label>
          <div className="flex gap-4 mt-2">
            <Popover open={openCoolBox} onOpenChange={setOpenCoolBox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  disabled={!isEditing}
                >
                  {selectedCool || "Select COOL"}
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
                            setUserData({
                              ...userData,
                              cool: item.no.toString(),
                            });
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
        </div>

        <div>
          <Label htmlFor="homebase">Homebase</Label>
          <div className="flex gap-4 mt-2">
            <Popover open={openHomebaseBox} onOpenChange={setOpenHomebaseBox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  disabled={!isEditing}
                >
                  {selectedHomebase || "Select Homebase"}
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
                            setUserData({
                              ...userData,
                              homebase: item.code.toUpperCase(),
                            });
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
        </div>

        <div className="flex justify-end gap-4 mt-4">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
