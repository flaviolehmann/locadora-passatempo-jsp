package main.model.util;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class FuncoesUtil {

    private FuncoesUtil() {
    }

    public static List<Long> getIdListFromStrArray(String[] ids) {
        if (ids == null) {
            return Collections.singletonList(-1L);
        }
        return Arrays.stream(ids).map(Long::parseLong).collect(Collectors.toList());
    }

    public static Long getLongFromRequestParam(HttpServletRequest request, String parameterName) {
        String parameterValue = request.getParameter(parameterName);
        return parameterValue != null && !parameterValue.isEmpty() ? Long.parseLong(parameterValue) : null;
    }
}
