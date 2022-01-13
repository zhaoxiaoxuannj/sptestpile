package com.ais.cs.datd.mgr.wapi.utils;

import org.apache.commons.lang3.StringUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author chaoyan
 * @date 2020/11/20
 */
public class TimeUtils {

    private static final SimpleDateFormat sdfYYYYMMDDHHmmss = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdfYYYYMMDD = new SimpleDateFormat("yyyy-MM-dd");


    public static final DateTimeFormatter DTF_YYYYMMDD = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public static final DateTimeFormatter DTF_YYYYMMDDHHmm = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    public static final DateTimeFormatter DTF_YYYYMMDDHHmmss = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static final ZoneId systemZoneId = ZoneId.systemDefault();


    public static SimpleDateFormat getSdfYYYYMMDDHHmmss() {
        return (SimpleDateFormat) sdfYYYYMMDDHHmmss.clone();
    }

    public static SimpleDateFormat getSdfYYYYMMDD() {
        return (SimpleDateFormat) sdfYYYYMMDD.clone();
    }


    /**
     * 获取今天的日期
     *
     * @return yyyy-MM-dd
     */
    public static String getTodayDate() {
        Calendar calendar = Calendar.getInstance();
        return getSdfYYYYMMDD().format(calendar.getTime());
    }

    public static String getYesterdayDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        return getSdfYYYYMMDD().format(calendar.getTime());
    }

    public static List<String> getBetweenDates(Date start, Date end) {
        List<String> result = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(start);
        while (calendar.getTime().before(end)) {
            result.add(sdf.format(calendar.getTime()));
            calendar.add(Calendar.DAY_OF_MONTH, 1);
        }
        result.add(sdf.format(end));
        return result;
    }


    public static LocalDateTime timestamp2LocalDateTime(long timestamp) {
        return Instant.ofEpochMilli(timestamp).atZone(systemZoneId).toLocalDateTime();
    }

    public static LocalDateTime date2LocalDateTime(Date date) {
        return LocalDateTime.ofInstant(date.toInstant(), systemZoneId);
    }


    public static Date localDateTime2Date(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(systemZoneId).toInstant());
    }

    public static LocalDateTime max(LocalDateTime o1, LocalDateTime o2) {
        return o1.compareTo(o2) > 0 ? o1 : o2;
    }

    public static LocalDateTime min(LocalDateTime o1, LocalDateTime o2) {
        return o1.compareTo(o2) < 0 ? o1 : o2;
    }

    public static LocalDateTime getStartOfDay(LocalDateTime localDateTime){
        return localDateTime.withHour(0).withMinute(0).withSecond(0).withNano(0);
    }
    public static LocalDateTime getEndOfDay(LocalDateTime localDateTime){
        return localDateTime.withHour(23).withMinute(59).withSecond(59);
    }

    /**
     * 格式化时间差 输出x年x月x天
     *
     * @param startTime
     * @param endTime
     * @return
     */
    public static String formatDuration(String startTime, String endTime) {
        LocalDate start = LocalDateTime.parse(startTime, DTF_YYYYMMDDHHmmss).toLocalDate();
        LocalDate end = LocalDateTime.parse(endTime, DTF_YYYYMMDDHHmmss).toLocalDate();
        if (end.isBefore(start)) {
            return null;
        }

        end = end.plusDays(1);
        StringBuilder sb = new StringBuilder();
        Period p = Period.between(start, end);
        if (p.getYears() > 0) {
            sb.append(p.getYears()).append("年");
        }
        if (p.getMonths() > 0) {
            sb.append(p.getMonths()).append("月");
        }
        if (p.getDays() > 0) {
            sb.append(p.getDays()).append("天");
        }
        return sb.toString();
    }

    public static String formatDuration2(String startTime, String endTime) {
        LocalDate start = LocalDateTime.parse(startTime, DTF_YYYYMMDDHHmmss).toLocalDate();
        LocalDate end = LocalDateTime.parse(endTime, DTF_YYYYMMDDHHmmss).toLocalDate();
        if (end.isBefore(start)) {
            return null;
        }

        end = end.plusDays(1);
        StringBuilder sb = new StringBuilder();
        Period p = Period.between(start, end);
        if (p.getYears() > 0) {
            sb.append(p.getYears()).append("年");
        }
        if (p.getMonths() > 0) {
            sb.append(p.getMonths()).append("月");
        }
        if (p.getDays() > 0) {
            sb.append(p.getDays()).append("天");
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        TimeUtils.formatDuration2("2021-12-31 10:05:02","2021-12-30 12:08:04");
    }
}
