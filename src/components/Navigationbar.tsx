import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const Navigationbar = () => {
  const { user } = useSelector((state: any) => state?.user);
  const { pathname } = useLocation();

  const handleSignOut = () => {
    localStorage.clear();
    window.location.pathname = "/";
    toast.success("You are logged out.");
  };
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              color={`${pathname == "/companies" ? "primary" : "foreground"}`}
              href="/companies"
            >
              Companies
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/persons"
              color={`${pathname == "/persons" ? "primary" : "foreground"}`}
              aria-current="page"
            >
              Show all persons
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color={`${pathname == "/profile" ? "primary" : "foreground"}`}
              href="/profile"
            >
              Profile
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="gap-x-0">
          {/* <NavbarItem>
            <span>{user?.email}</span>
          </NavbarItem> */}
          <NavbarItem className="flex flex-col">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  size="sm"
                  className="shadow-none focus-within:outline-none flex flex-col  w-max h-max border-none rounded-full hover:!bg-transparent white focus-within:bg-white"
                >
                  <Avatar
                    size="sm"
                    name={`${user?.firstName} ${user?.lastName}`}
                    color={"warning"}
                  />
                  <span>{user?.email}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                className="focus-within:outline-none "
              >
                <DropdownItem key="signOut" onClick={handleSignOut}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Navigationbar;
