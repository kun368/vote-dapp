package com.zzkun.votedapp.entities;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;

@Data
public class ResultVO<T> {

    private String status;

    private String message;

    private T data;

    public static <T> ResultVO<T> success(String msg, T data) {
        ResultVO<T> ret = new ResultVO<>();
        ret.data = data;
        ret.status = "SUCCESS";
        ret.message = StringUtils.trimToEmpty(msg);
        return ret;
    }

    public static ResultVO success(String msg) {
        ResultVO ret = new ResultVO();
        ret.data = new HashMap<String, String>();
        ret.status = "SUCCESS";
        ret.message = msg;
        return ret;
    }

    public static ResultVO success() {
        ResultVO ret = new ResultVO();
        ret.data = new HashMap<String, String>();
        ret.status = "SUCCESS";
        ret.message = "";
        return ret;
    }

    public static <T> ResultVO<T> fail(String msg, T data) {
        ResultVO<T> ret = new ResultVO<>();
        ret.data = data;
        ret.status = "FAILED";
        ret.message = StringUtils.trimToNull(msg);
        if (ret.message == null) {
            ret.message = "系统内部错误";
        }
        return ret;
    }

    public static ResultVO fail(String msg) {
        ResultVO ret = new ResultVO();
        ret.data = new HashMap<String, String>();
        ret.status = "FAILED";
        ret.message = msg;
        return ret;
    }

    public static ResultVO fail() {
        ResultVO ret = new ResultVO();
        ret.data = new HashMap<String, String>();
        ret.status = "FAILED";
        ret.message = "系统内部错误";
        return ret;
    }
}
