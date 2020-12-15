package main.model.util;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FuncoesUtil {

    private FuncoesUtil() {
    }

    public static List<Long> getIdListFromStrArray(String[] ids) {
        return Arrays.stream(ids).map(Long::parseLong).collect(Collectors.toList());
    }
}
