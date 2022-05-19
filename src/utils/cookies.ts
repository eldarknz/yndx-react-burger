export const getCookie = (name: string) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') // eslint-disable-line
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

type TCookieProps = {
    [name: string]: number | string | boolean;
  }
  
type TExpiredCookie = {
    expires?: number | Date | string;
}

export const setCookie = (name: string, value: string | null, props?: TCookieProps & TExpiredCookie) => {
    props = props || {};
    let exp: (Date | null) = null;
    if (typeof props.expires == 'number' && props.expires) {
      const d = new Date();
      d.setTime(d.getTime() + props.expires * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value ?? '');
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
}
  
export const deleteCookie = (name: string) => {
    setCookie(name, null, { expires: -1 });
}