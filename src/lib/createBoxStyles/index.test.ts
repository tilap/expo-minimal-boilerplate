import { ViewStyle } from "react-native";
import { createStyles } from ".";

describe("createStyles", () => {
  test("should handle fullWidth and display together", () => {
    const props = {
      fullWidth: true,
      display: "flex" as ViewStyle["display"],
    };

    const styles = createStyles(props);
    expect(styles.width).toBe("100%");
    expect(styles.display).toBe("flex");
  });

  test("should apply fullWidth style", () => {
    const props = {
      fullWidth: true,
    };

    const styles = createStyles(props);
    expect(styles.width).toBe("100%");
  });

  test("should not apply fullWidth style when false", () => {
    const props = {
      fullWidth: false,
    };

    const styles = createStyles(props);
    expect(styles.width).toBeUndefined();
  });

  test("should apply display style", () => {
    const props = {
      display: "flex" as ViewStyle["display"],
    };

    const styles = createStyles(props);
    expect(styles.display).toBe("flex");
  });

  test("should apply margin and padding styles", () => {
    const props = {
      m: 10,
      p: 20,
    };

    const styles = createStyles(props);
    expect(styles.margin).toBe(10 * 4);
    expect(styles.padding).toBe(20 * 4);
  });

  test("should handle flex properties", () => {
    const props = {
      flex: 1,
      flexDirection: "row" as ViewStyle["flexDirection"],
      justifyContent: "center" as ViewStyle["justifyContent"],
      alignItems: "flex-start" as ViewStyle["alignItems"],
    };

    const styles = createStyles(props);
    expect(styles.flex).toBe(1);
    expect(styles.flexDirection).toBe("row");
    expect(styles.justifyContent).toBe("center");
    expect(styles.alignItems).toBe("flex-start");
  });

  test("should apply margin and padding with multiplier", () => {
    const props = {
      m: 5,
      p: 2,
    };

    const styles = createStyles(props, 4);
    expect(styles.margin).toBe(5 * 4);
    expect(styles.padding).toBe(2 * 4);
  });

  test("should return default styles when no props are provided", () => {
    const props = {};
    const styles = createStyles(props);
    expect(styles).toEqual({});
  });

  test("should handle negative margin values", () => {
    const props = {
      m: -5,
    };

    const styles = createStyles(props, 4);
    expect(styles.margin).toBe(-5 * 4);
  });

  test("should handle mixed margin and padding values", () => {
    const props = {
      m: 10,
      p: 5,
      mt: 20,
    };

    const styles = createStyles(props, 6);
    expect(styles.margin).toBe(10 * 6);
    expect(styles.padding).toBe(5 * 6);
    expect(styles.marginTop).toBe(20 * 6);
  });

  test("should handle undefined values gracefully", () => {
    const props = {
      flex: undefined,
      display: undefined,
    };

    const styles = createStyles(props);
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
    };

    const styles = createStyles(props, 5);
    expect(styles.margin).toBe(10 * 5); // m
    expect(styles.marginTop).toBe(20 * 5); // mt
    expect(styles.marginRight).toBe(30 * 5); // mr
    expect(styles.marginBottom).toBe(40 * 5); // mb
    expect(styles.marginLeft).toBe(50 * 5); // ml
    expect(styles.marginHorizontal).toBe(60 * 5); // mx
    expect(styles.marginVertical).toBe(70 * 5); // my
    expect(styles.padding).toBe(80 * 5); // p
    expect(styles.paddingTop).toBe(90 * 5); // pt
    expect(styles.paddingRight).toBe(100 * 5); // pr
    expect(styles.paddingBottom).toBe(110 * 5); // pb
    expect(styles.paddingLeft).toBe(120 * 5); // pl
    expect(styles.paddingHorizontal).toBe(130 * 5); // px
    expect(styles.paddingVertical).toBe(140 * 5); // py
  });

  test("should apply flex property when set to a number", () => {
    const props = {
      flex: 2,
    };

    const styles = createStyles(props);
    expect(styles.flex).toBe(2);
  });

  test("should apply flex property when set to 'auto'", () => {
    const props = {
      flex: "auto" as 1 | "none" | "auto",
    };

    const styles = createStyles(props);
    expect(styles.flex).toBe(1);
  });

  test("should not apply flex property when set to 'none'", () => {
    const props = {
      flex: "none" as 1 | "none" | "auto",
    };

    const styles = createStyles(props);
    expect(styles.flex).toBeUndefined();
  });

  test("should apply flexWrap property when set to 'wrap'", () => {
    const props = {
      flexWrap: "wrap" as ViewStyle["flexWrap"],
    };

    const styles = createStyles(props);
    expect(styles.flexWrap).toBe("wrap");
  });

  test("should apply flexWrap property when set to 'nowrap'", () => {
    const props = {
      flexWrap: "nowrap" as ViewStyle["flexWrap"],
    };

    const styles = createStyles(props);
    expect(styles.flexWrap).toBe("nowrap");
  });

  test("should apply flexWrap property when set to 'wrap-reverse'", () => {
    const props = {
      flexWrap: "wrap-reverse" as ViewStyle["flexWrap"],
    };

    const styles = createStyles(props);
    expect(styles.flexWrap).toBe("wrap-reverse");
  });

  test("should not apply flexWrap property when not provided", () => {
    const props = {};

    const styles = createStyles(props);
    expect(styles.flexWrap).toBeUndefined();
  });
});
