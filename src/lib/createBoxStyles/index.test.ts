import { ViewStyle } from "react-native";
import { BaseTheme, createStyles } from ".";

type ThemeTest = { prop: string } & BaseTheme;

describe("createStyles", () => {
  const theme: ThemeTest = { prop: "value" };

  test("should handle fullWidth and display together", () => {
    const props = {
      fullWidth: true,
      display: "flex" as ViewStyle["display"], // Cast to ViewStyle['display']
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.width).toBe("100%"); // Check if fullWidth is applied
    expect(styles.display).toBe("flex"); // Check if display is applied
  });

  test("should apply fullWidth style", () => {
    const props = {
      fullWidth: true,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.width).toBe("100%");
  });

  test("should not apply fullWidth style when false", () => {
    const props = {
      fullWidth: false,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.width).toBeUndefined();
  });

  test("should apply display style", () => {
    const props = {
      display: "flex" as ViewStyle["display"], // Cast to ViewStyle['display']
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.display).toBe("flex");
  });

  test("should apply margin and padding styles", () => {
    const props = {
      m: 10,
      p: 20,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.margin).toBe(10 * 4); // Assuming multiplier is 4
    expect(styles.padding).toBe(20 * 4);
  });

  test("should combine base styles and sx styles", () => {
    const props = {
      sx: { fullWidth: true, display: "block" as ViewStyle["display"] }, // Cast to ViewStyle['display']
      fullWidth: false, // This should be overridden by sx
    };

    const styles = createStyles(props, theme);
    expect(styles.width).toBe("100%"); // From sx
    expect(styles.display).toBe("block"); // From sx
  });

  test("should handle flex properties", () => {
    const props = {
      flex: 1,
      flexDirection: "row" as ViewStyle["flexDirection"], // Cast to ViewStyle['flexDirection']
      justifyContent: "center" as ViewStyle["justifyContent"], // Cast to ViewStyle['justifyContent']
      alignItems: "flex-start" as ViewStyle["alignItems"], // Cast to ViewStyle['alignItems']
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flex).toBe(1);
    expect(styles.flexDirection).toBe("row");
    expect(styles.justifyContent).toBe("center");
    expect(styles.alignItems).toBe("flex-start");
  });

  test("should apply margin and padding with multiplier", () => {
    const props = {
      m: 5,
      p: 2,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.margin).toBe(5 * 4); // Assuming multiplier is 4
    expect(styles.padding).toBe(2 * 4);
  });

  test("should return default styles when no props are provided", () => {
    const props = {};
    const styles = createStyles(props, theme);
    expect(styles).toEqual({});
  });

  test("should handle negative margin values", () => {
    const props = {
      m: -5,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.margin).toBe(-5 * 4); // Assuming multiplier is 4
  });

  test("should handle mixed margin and padding values", () => {
    const props = {
      m: 10,
      p: 5,
      mt: 20,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.margin).toBe(10 * 4); // Assuming multiplier is 4
    expect(styles.padding).toBe(5 * 4);
    expect(styles.marginTop).toBe(20 * 4); // Specific margin top
  });

  test("should apply sx function correctly", () => {
    const props = {
      sx: () => ({
        fullWidth: true,
        display: "inline-block" as ViewStyle["display"],
      }),
      fullWidth: false, // This should be overridden by sx
    };

    const styles = createStyles(props, theme);
    expect(styles.width).toBe("100%"); // From sx
    expect(styles.display).toBe("inline-block"); // From sx
  });

  test("should handle undefined values gracefully", () => {
    const props = {
      flex: undefined,
      display: undefined,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flex).toBeUndefined();
    expect(styles.display).toBeUndefined();
  });

  test("should apply margin and padding styles from props", () => {
    const props = {
      m: 10,
      mt: 20,
      mr: 30,
      mb: 40,
      ml: 50,
      mx: 60,
      my: 70,
      p: 80,
      pt: 90,
      pr: 100,
      pb: 110,
      pl: 120,
      px: 130,
      py: 140,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.margin).toBe(10 * 4); // m
    expect(styles.marginTop).toBe(20 * 4); // mt
    expect(styles.marginRight).toBe(30 * 4); // mr
    expect(styles.marginBottom).toBe(40 * 4); // mb
    expect(styles.marginLeft).toBe(50 * 4); // ml
    expect(styles.marginHorizontal).toBe(60 * 4); // mx
    expect(styles.marginVertical).toBe(70 * 4); // my
    expect(styles.padding).toBe(80 * 4); // p
    expect(styles.paddingTop).toBe(90 * 4); // pt
    expect(styles.paddingRight).toBe(100 * 4); // pr
    expect(styles.paddingBottom).toBe(110 * 4); // pb
    expect(styles.paddingLeft).toBe(120 * 4); // pl
    expect(styles.paddingHorizontal).toBe(130 * 4); // px
    expect(styles.paddingVertical).toBe(140 * 4); // py
  });

  test("should apply margin and padding styles from sx", () => {
    const props = {
      sx: {
        m: 10,
        mt: 20,
        mr: 30,
        mb: 40,
        ml: 50,
        mx: 60,
        my: 70,
        p: 80,
        pt: 90,
        pr: 100,
        pb: 110,
        pl: 120,
        px: 130,
        py: 140,
      },
    };

    const styles = createStyles(props, theme);
    expect(styles.margin).toBe(10 * 4); // m
    expect(styles.marginTop).toBe(20 * 4); // mt
    expect(styles.marginRight).toBe(30 * 4); // mr
    expect(styles.marginBottom).toBe(40 * 4); // mb
    expect(styles.marginLeft).toBe(50 * 4); // ml
    expect(styles.marginHorizontal).toBe(60 * 4); // mx
    expect(styles.marginVertical).toBe(70 * 4); // my
    expect(styles.padding).toBe(80 * 4); // p
    expect(styles.paddingTop).toBe(90 * 4); // pt
    expect(styles.paddingRight).toBe(100 * 4); // pr
    expect(styles.paddingBottom).toBe(110 * 4); // pb
    expect(styles.paddingLeft).toBe(120 * 4); // pl
    expect(styles.paddingHorizontal).toBe(130 * 4); // px
    expect(styles.paddingVertical).toBe(140 * 4); // py
  });

  test("should apply margin and padding styles from sx when theme has a custom multiplier", () => {
    const props = {
      sx: {
        m: 10,
        mt: 20,
        mr: 30,
        mb: 40,
        ml: 50,
        mx: 60,
        my: 70,
        p: 80,
        pt: 90,
        pr: 100,
        pb: 110,
        pl: 120,
        px: 130,
        py: 140,
      },
    };

    const boxMultiplier = 2;
    const customTheme: ThemeTest = { prop: "value", boxMultiplier };

    const styles = createStyles(props, customTheme);
    expect(styles.margin).toBe(10 * boxMultiplier); // m
    expect(styles.marginTop).toBe(20 * boxMultiplier); // mt
    expect(styles.marginRight).toBe(30 * boxMultiplier); // mr
    expect(styles.marginBottom).toBe(40 * boxMultiplier); // mb
    expect(styles.marginLeft).toBe(50 * boxMultiplier); // ml
    expect(styles.marginHorizontal).toBe(60 * boxMultiplier); // mx
    expect(styles.marginVertical).toBe(70 * boxMultiplier); // my
    expect(styles.padding).toBe(80 * boxMultiplier); // p
    expect(styles.paddingTop).toBe(90 * boxMultiplier); // pt
    expect(styles.paddingRight).toBe(100 * boxMultiplier); // pr
    expect(styles.paddingBottom).toBe(110 * boxMultiplier); // pb
    expect(styles.paddingLeft).toBe(120 * boxMultiplier); // pl
    expect(styles.paddingHorizontal).toBe(130 * boxMultiplier); // px
    expect(styles.paddingVertical).toBe(140 * boxMultiplier); // py
  });

  test("should apply fullWidth from sx styles", () => {
    const props = {
      sx: { fullWidth: true },
    };

    const styles = createStyles(props, theme);
    expect(styles.width).toBe("100%"); // Check if fullWidth is applied
  });

  test("should apply display from sx styles", () => {
    const props = {
      sx: { display: "inline-block" as ViewStyle["display"] },
    };

    const styles = createStyles(props, theme);
    expect(styles.display).toBe("inline-block"); // Check if display is applied
  });

  test("should apply flex property when set to a number", () => {
    const props = {
      flex: 2,
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flex).toBe(2); // Check if flex is applied
  });

  test("should apply flex property when set to 'auto'", () => {
    const props = {
      flex: "auto" as 1 | "none" | "auto", // Cast to the correct type
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flex).toBe(1); // Check if flex is set to 1 for 'auto'
  });

  test("should not apply flex property when set to 'none'", () => {
    const props = {
      flex: "none" as 1 | "none" | "auto", // Cast to the correct type
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flex).toBeUndefined(); // Check if flex is not applied
  });

  test("should not apply flex property when not provided", () => {
    const props = {
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flex).toBeUndefined(); // Check if flex is not applied
  });

  test("should apply flexWrap property when set to 'wrap'", () => {
    const props = {
      flexWrap: "wrap" as ViewStyle["flexWrap"], // Cast to ViewStyle['flexWrap']
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flexWrap).toBe("wrap"); // Check if flexWrap is applied
  });

  test("should apply flexWrap property when set to 'nowrap'", () => {
    const props = {
      flexWrap: "nowrap" as ViewStyle["flexWrap"], // Cast to ViewStyle['flexWrap']
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flexWrap).toBe("nowrap"); // Check if flexWrap is applied
  });

  test("should apply flexWrap property when set to 'wrap-reverse'", () => {
    const props = {
      flexWrap: "wrap-reverse" as ViewStyle["flexWrap"], // Cast to ViewStyle['flexWrap']
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flexWrap).toBe("wrap-reverse"); // Check if flexWrap is applied
  });

  test("should not apply flexWrap property when not provided", () => {
    const props = {
      sx: {},
    };

    const styles = createStyles(props, theme);
    expect(styles.flexWrap).toBeUndefined(); // Check if flexWrap is not applied
  });
});
