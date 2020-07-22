import React, { PureComponent } from "react";
import classnames from "classnames";
import { Alerts } from "Components";
import Sidebar from "./components/menu/horizontal-menu/HorizontalMenu";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import themeConfig from "../configs/themeConfig";

// import { connect } from "react-redux";
// import {
//   changeNavbarColor,
//   changeNavbarType,
//   changeFooterType,
//   changeMenuColor,
//   hideScrollToTop,
//   changeMode,
// } from "../redux/actions/customizer/index";

export default class HorizontalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: false,
    layout: themeConfig.theme, //this.props.app.customizer.theme,
    collapsedContent: false,
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    isTouropen: false,
    currRoute: this.props.location.pathname,
    menuOpen: themeConfig.menuOpen,
  };

  mounted = false;

  updateWidth = () => {
    if (this.mounted) {
      this.setState((prevState) => ({
        width: window.innerWidth,
      }));
    }
  };

  updateScroll = () => {
    if (this.mounted) {
      this.setState({ scroll: window.pageYOffset });
    }
  };

  handleCustomizer = (bool) => {
    this.setState({
      customizer: bool,
    });
  };

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
        window.addEventListener("scroll", this.updateScroll, false);
      }
      if (this.props.location.pathname === "/pages/profile") {
        this.setState({
          sidebarState: true,
          collapsedContent: true,
        });
      }
      let layout = themeConfig.theme;
      return layout === "dark"
        ? document.body.classList.add("dark-layout")
        : layout === "semi-dark"
        ? document.body.classList.add("semi-dark-layout")
        : null;
    }
  }

  // Fix memory leak
  // componentWillUnmount() {
  //   if (window !== "undefined") {
  //     window.removeEventListener("resize", this.updateWidth);
  //     window.removeEventListener("scroll", this.updateScroll);
  //   }
  // }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate() {
    if (this.mounted) {
      if (this.state.currRoute !== this.props.location.pathname) {
        this.handleRouteChange();
        this.setState({
          currRoute: this.props.location.pathname,
        });
      }

      let layout = themeConfig.theme;
      if (layout === "dark") {
        document.body.classList.remove("semi-dark-layout");
        document.body.classList.add("dark-layout");
      } else if (layout === "semi-dark") {
        document.body.classList.remove("dark-layout");
        document.body.classList.add("semi-dark-layout");
      } else {
        return document.body.classList.remove(
          "dark-layout",
          "semi-dark-layout"
        );
      }
    }
  }

  handleRouteChange = () => {
    if (this.props.location.pathname === "/pages/profile") {
      this.setState({
        collapsedContent: true,
      });
    } else {
      this.setState({
        sidebarState: false,
        collapsedContent: false,
      });
    }
  };

  toggleSidebarMenu = () => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent,
    });
  };

  sidebarMenuHover = () => {
    this.setState({
      sidebarState: !this.state.sidebarState,
    });
  };

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        window.addEventListener("resize", () => {
          if (this.state.sidebarHidden) {
            this.setState({
              sidebarHidden: !this.state.sidebarHidden,
            });
          }
        });
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden,
      });
    }
  };

  handleCurrentLanguage = (lang) => {
    this.setState({
      currentLang: lang,
    });
  };

  handleAppOverlay = (value) => {
    if (value.length > 0)
      this.setState({
        appOverlay: true,
      });
    else if (value.length > 0 || value === "") {
      this.setState({
        appOverlay: false,
      });
    }
  };

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false,
    });
  };

  render() {
    // let customizerProps = this.props.app.customizer;
    let navbarTypeArr = ["sticky", "static", "sticky", "floating", "hidden"];
    let menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark",
    ];
    return (
      <div
        id="aaa"
        className={classnames(
          `wrapper horizontal-layout theme-${themeConfig.menuTheme}`,
          {
            "menu-collapsed":
              this.state.collapsedContent === true && this.state.width > 1200,
            "fixed-footer": themeConfig.footerType === "sticky",
            "navbar-static": themeConfig.navbarType === "static",
            "navbar-sticky": themeConfig.navbarType === "sticky",
            "navbar-floating":
              themeConfig.navbarType === "floating" ||
              !navbarTypeArr.includes(themeConfig.navbarType),
            "navbar-hidden": themeConfig.navbarType === "hidden",
            "theme-primary": !menuThemeArr.includes(themeConfig.menuTheme),
          }
        )}
      >
        <Sidebar
          toggleSidebarMenu={this.toggleSidebarMenu}
          sidebarState={this.state.sidebarState}
          sidebarHover={this.sidebarMenuHover}
          sidebarVisibility={this.handleSidebarVisibility}
          visibilityState={this.state.sidebarHidden}
          activePath={this.props.match.path}
          currentLang={this.state.currentLang}
          activeTheme={themeConfig.menuTheme}
          collapsed={this.state.collapsedContent}
          menuOpen={this.state.menuOpen}
          navbarType={themeConfig.navbarType}
        />
        <div
          className={classnames("app-content content", {
            "show-overlay": this.state.appOverlay === true,
          })}
          onClick={this.handleAppOverlayClick}
        >
          <Navbar
            horizontal
            scrolling={this.state.scroll > 50 ? true : false}
            toggleSidebarMenu={this.toggleSidebarMenu}
            sidebarState={this.state.sidebarState}
            sidebarVisibility={this.handleSidebarVisibility}
            currentLang={this.state.currentLang}
            changeCurrentLang={this.handleCurrentLanguage}
            handleAppOverlay={this.handleAppOverlay}
            appOverlayState={this.state.appOverlay}
            navbarColor={themeConfig.navbarColor}
            navbarType={themeConfig.navbarType}
          />
          <div className="content-wrapper">
            <Alerts />
            {this.props.children}
          </div>
        </div>

        <Footer
          footerType={themeConfig.footerType}
          hideScrollToTop={themeConfig.hideScrollToTop}
        />
        {/* {themeConfig.disableCustomizer !== true ? (
          <Customizer
            scrollToTop={themeConfig.hideScrollToTop}
            activeNavbar={themeConfig.navbarColor}
            activeMode={themeConfig.theme}
            navbarType={themeConfig.navbarType}
            footerType={themeConfig.footerType}
            menuTheme={customizerProps.menuTheme}
            customizerState={this.state.customizer}
            handleCustomizer={this.handleCustomizer}
            changeNavbar={this.props.changeNavbarColor}
            changeNavbarType={this.props.changeNavbarType}
            changeFooterType={this.props.changeFooterType}
            changeMenuTheme={this.props.changeMenuColor}
            hideScrollToTop={this.props.hideScrollToTop}
            changeMode={this.props.changeMode}
          />
        ) : null} */}
        <div
          className="sidenav-overlay"
          onClick={this.handleSidebarVisibility}
        />
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     app: state.customizer,
//   };
// };
// export default connect(mapStateToProps, {
//   changeNavbarColor,
//   changeNavbarType,
//   changeFooterType,
//   changeMenuColor,
//   hideScrollToTop,
//   changeMode,
// })(HorizontalLayout);
