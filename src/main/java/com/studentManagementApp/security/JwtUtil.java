package com.studentManagementApp.security;

import com.studentManagementApp.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtUtil {
//    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final String secret="70d1b578790941ab9f2bfcec98d38d91107506445819a12bba9c2ed2847fb43f";

    private static final String SECRET="demo-app";

    public String generateToken(User user) {
        return generateToken(user,2);
    }
    @SneakyThrows
    private String generateToken(final User user, final long hours) {
        final Map<String,Object> claims= new HashMap<>();
        claims.put("username", user.getUsername());
        return Jwts.builder().setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * hours))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean isTokenExpired(final String token){
        try{
            final Date expirationDate=getClaimsfromToken(token);
            return expirationDate.before(new Date());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    private static Date getClaimsfromToken(final String token){
        final Claims claims=Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        return claims.getExpiration();
    }

    public boolean validateToken(String token) {
        try {
            JwtParser parser = Jwts.parser().setSigningKey(SECRET);
            Claims claims = parser.parseClaimsJws(token).getBody();
            log.info("token valid :{}",claims.getExpiration().after(new Date()));
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            log.info(e.toString());
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        JwtParser parser = Jwts.parser().setSigningKey(SECRET);
        Claims claims = parser.parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
